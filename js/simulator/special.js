// SSを発動する(buttonから)
function ss_push(n) {
	return ssPushWithParam(Field, n);
}

// SSを発動する
function ssPushWithParam(fld, n){
	var ss_rst = true;
	var card = fld.Allys.Deck[n];
	var now = fld.Allys.Now[n];
	var is_l = is_legendmode(fld, card, now);
	var ss = is_l ? card.ss2 : card.ss1;
	var is_doubleskill = $.grep(now.turn_effect, (e) => e.type == "ss_doubleskill" ).length > 0;
	var is_skillcopy = (ss.proc && ss.proc[0] && ss.proc[0].is_skillcopy);
	var charged = $.grep(now.turn_effect, (e) => e.type == "ss_charge")[0];
	var charged_skill = charged ? {proc: charged.charge_skl} : null;
	
	var check_ss = (is_skillcopy ? (charged_skill || fld.Status.latest_ss) : ss);
	
	// SS発動前チェック
	if (is_ss_active(fld, n) && sscheck_before(fld, check_ss, n)) {
		// SSを打つ
		ss_rst = ss_procdo(fld, ss, now, n, false);
	} else {
		// チェックを通過しなかったら打ち切る
		return;
	}
	// 発動成功なら
	if (ss_rst) {
		fld.log_push("Unit[" + (n + 1) + "]: SS発動");
		// 発動後処理
		ss_afterproc(fld, n);
		if (!now.flags.ss_chargefin) {
			// SSを保存しておく
			if (ss.proc && ss.proc[0] && !ss.proc[0].is_skillcopy) {
				fld.Status.latest_ss = ss;
				fld.Status.latest_now = now;
			}
			// ------------------
			// ダブルスキル付与状況を確認
			if(is_doubleskill) {
				// 付与状態を解除
				turneff_break(fld, now.turn_effect, n, "ss_doubleskill");
			}
			else {
				// L状態ならL潜在を解除
				if (is_l) {
					now.islegend = false;
					fld.log_push("Unit[" + (n + 1) + "]: Lモード解除");
				}
				// SSターンをリセット
				now.ss_quizcount = 0;
				now.ss_current = has_secondfastnum(fld, card);
				now.ss_isfirst = false;
				now.ss_isboost = false;
			}
		} else {
			// チャージ発動状態解除
			now.flags.ss_chargefin = false;
		}
		// ------------------
		// 攻撃力の再計算を行う
		func_reawake(fld, fld.Allys.Deck, fld.Allys.Now);
		// 再現用ログ関連
		actl_save_special(fld, n);
		// [進む]を使えないように
		if (!fld.Status.isautomode && !Field_log.is_ssindex) {
			Field_log.now_index++;
			Field_log.is_ssindex = true;
		}
		Field_log._removeover(fld.Status.totalturn);
		// 全滅していたら次のターンへ進む
		if (is_allkill(fld)) {
			// 蘇生があるかのチェック
			var is_rev = isexist_enemy_rev(fld);
			nextturn(fld, !is_rev);
		}
		// 助っ人チェック
		helper_change_process(fld);
		// 再表示
		sim_show(fld);
	} else {
		// failed
		$("#dialog_ss_noaction").dialog("open");
	}
	// 対象指定SSの指定を解除
	$("#sso_selected_index").text("");
	$("#sso_skilled_index").text("");
}

// SS発動前に味方単体指定があるかどうかを確認する関数
function sscheck_before(fld, ss, n) {
	var is_exist = false;
	var is_chargefin = true;
	
	for (var i = 0; i < (ss.proc || []).length; i++) {
		is_exist = is_exist || (ss.proc[i].target == "ally_one");
		if (ss.proc[i].is_skillcopy) {
			var ls_ss = fld.Status.latest_ss.proc;
			if(!ls_ss){
				continue;
			}
			for (var j = 0; j < ls_ss.length; j++) {
				is_exist = is_exist || (ls_ss[j].target == "ally_one");
			}
		}
	}
	// チャージスキルなら、チャージ完了後のSS発動時のみ対象指定
	var now = fld.Allys.Now[n];
	if(ss.charged > 0 && !now.flags.ss_chargefin){
		is_chargefin = false;
	}
	
	if (is_exist && is_chargefin) {
		// 指定済みかチェック
		var target_seled = ss_allyselect_getindex(fld);
		// 指定済みならOK
		if (target_seled >= 0) {
			return true;
		}
		// 未指定なら選択ダイアログを出して処理を終了させる
		else {
			$("#sso_skilled_index").text(n);
			$("#dialog_ss_selectone").dialog("open");
			return false;
		}
	} else {
		return true;
	}
}

// SSを順番に発動していく関数
function ss_procdo(fld, ss, now, index, is_skillcopy) {
	var ss_rst = true;
	var ss_tmpl_rst = false;
	if (ss.proc != null) {
		// SS発動前の敵の数を取得
		var en_lived = $.grep(GetNowBattleEnemys(fld), function(e){
			return e.nowhp > 0;
		}).length;
		// チャージスキルの場合
		if (ss.charged > 0 || now.flags.ss_chargefin) {
			// L状態なら、L化によって上昇している攻撃力を取得
			var lup_atk = 0;
			var card = fld.Allys.Deck[index];
			if(is_legendmode(fld, card, now)){
				var os = pickup_awakes(fld,  card, "own_status_up", true);
				var as = pickup_awakes(fld, card, "status_up", true);
				lup_atk = ArrayMath.sum([...os, ...as], () => true, "up_atk");
			}
			// チャージが終わっているか確認し、終わってないなら追加
			if (!now.flags.ss_chargefin) {
				var c_turn = ss.charged;
				// C短縮結晶の情報を取得
				var card = fld.Allys.Deck[index];
				var aw_t = pickup_awakes(fld, card, "Awake_chargeTurnMinus", false);
				if(aw_t.length > 0){
					var dsum = ArrayMath.sum($.map(aw_t, (e) => {
						return e.downvalue;
					}));
					c_turn = Math.max(c_turn - dsum, 1);
				}
				// 自身に行動不可効果を付与
				now.turn_effect.push({
					desc: "チャージスキル待機(残り" + c_turn + "t)",
					type: "ss_charge",
					icon: "force_reservior",// 後で変える(?)
					isdual: false,
					iscursebreak: false,	// 呪い解除されない
					isreduce_stg: true,		// ターン跨ぎでカウントが減る
					priority: 1,
					charge_turn: c_turn,
					charge_skl: $.extend(true, ss.proc, []),
					turn: -1,
					lim_turn: -1,
					ss_disabled: true,		// SS発動不可
					// 攻撃無効
					bef_answer: function (f, as) {
						return false;
					},
					// 反射無効
					bef_skillcounter: function (f, ai) {
						return false;
					},
					// カウント減少
					effect: function (fl, oi, teff, state, is_t, is_b, is_sfin) {
						// SS以外で戦闘を跨いだ場合カウントを減らす
						if (is_t && (!is_sfin || !is_b)) {
							teff.charge_turn--;
							teff.desc = "チャージスキル待機(残り" + Math.max(teff.charge_turn, 0) + "t)";
						}
						this.ss_disabled = (teff.charge_turn > 0);
					},
					// 発動スキル
					charged_fin: function (fl, oi) {
						// 発動可能状態にセット
						var now = fl.Allys.Now[oi];
						now.flags.ss_chargefin = true;
						now.flags.ss_chargeskl = this.charge_skl;
						now.flags.ss_chargelup = this.lup_atk;
						return;
					},
					// L時ATKUPの仮置き
					lup_atk,
				});
				// 全体チャージスキルなら味方全体にnT行動不可効果付与
				if (ss.isallcharge) {
					ss_add_chargenomove_otheruser(fld, c_turn, index);
				}
				fld.log_push("Unit[" + (index + 1) + "]: チャージスキル発動待機…");
				// ため処理終了
				return true;
			}
			// 終わっているなら発動
			else {
				var skl = now.flags.ss_chargeskl;
				// 攻撃力を暫定的にL潜在分だけUPさせる
				// また、現在L状態ならその分は一時的に無効化する
				// 発動終了時に再計算されるので、解除については特に記載しない
				now.atk += now.flags.ss_chargelup || 0;
				now.atk -= lup_atk || 0;
				for (var i = 0; i < skl.length; i++) {
					if (skl[i]) {
						ss_tmpl_rst = ss_object_done(fld, index, skl[i], {
							is_check_crs: true,
							is_skillcopy,
						});
					}
				}
				now.flags.ss_chargeskl = null;
				// 削除
				turneff_break_cond(fld, now.turn_effect, -1, function(tf){
					return !tf.charged_fin && tf.charge_turn <= 0;
				}, "end");
			}
		} else {
			// チャージでないなら普通に実行
			for (var i = 0; i < ss.proc.length; i++) {
				if (ss.proc[i]) {
					ss_tmpl_rst = ss_object_done(fld, index, ss.proc[i], {
						is_check_crs: true,
						is_skillcopy,
					});
				}
			}
		}
		// 撃破数に応じてch+処理
		if(ss.chadd_killing > 0){
			// SS発動後の敵の数を取得
			var en_living = $.grep(GetNowBattleEnemys(fld), function(e){
				return e.nowhp > 0;
			}).length;
			// 敵の数が変化しているならch+
			var addch = en_lived - en_living;
			if(addch > 0){
				//if (fld.Status.chain_status >= 0) {
					fld.Status.chain += addch * ss.chadd_killing;
					fld.log_push("チェイン付与: +" + addch);
				//}
			}
		}
		ss_rst = ss_rst || ss_tmpl_rst;
	}
	return ss_rst !== false;
}

// SS発動後処理
function ss_afterproc(fld, n) {
	// 敵スキル関係の処理
	var enemys = GetNowBattleEnemys(fld);
	$.each(enemys, function (i, e) {
		// スキル反射確認
		if (e.flags.is_ss_attack && e.turn_effect.length > 0) {
			var skillct = $.grep(e.turn_effect, function (g) {
				return g.on_ss_damage !== undefined;
			});
			for (var j = 0; j < skillct.length; j++) {
				skillct[j].on_ss_damage(fld, i, n);
			}
			e.flags.is_ss_attack = false;
		}
		// スキル反応確認
		$.each(e.turn_effect, function (g) {
			if (g.type == "skill_response") {
				g.on_ss_invoke(fld, i);
			}
		});
	});
	// ターン効果確認
	turneff_check_skillcounter(fld);
	turn_effect_check(fld, false, is_allkill(fld));
	enemy_turn_effect_check(fld, false);
	// 死亡時処理
	enemy_check_ondead(fld);
	// 敵ダメージ反応系
	enemy_damage_switch_check(fld, "damage_switch", true, false, false);
}

// Lモードに入るタイミングの処理
function legend_timing_check(fld, cards, nows, index, is_ignore_spskill) {
	var is_l = (get_ssturn(fld, cards[index], nows[index])[1] == 0); //is_legendmode(cards[index], nows[index]);
	var rst = is_l && !nows[index].islegend;
	if (rst) {
		nows[index].islegend = true;
		// 最初の初期化処理中なら代入しない(烈眼の処理の関係で)
		if(!fld.Status.is_initialize){
			nows[index].lgstart_turn = fld.Status.totalturn;
		}
		fld.log_push("Unit[" + (index + 1) + "]: Lモード");
		// L時の潜在を反映させる
		//add_awake_ally(cards, nows, index, true);
		func_reawake(fld, cards, nows);
		// L時のSSを発動する
		if (!is_ignore_spskill) {
			Awake_dospskill(fld, index);
		}
	}
}

// Lモードに入っているかどうかを判定する
function is_legendmode(fld, card, now) {
	return card.ss2 ? now.islegend = now.ss_current >= card.ss2.turn : false;
}

// Lモードに入っているかどうかを判定する(ゾラス被ダメUP潜在以外用)
// [解答時にL判定が既に入っているタイプ用]
function is_legendmode_onAnswer(fld, card, now) {
	return get_ssturn(fld, card, now)[1] == 0;
}

// SSが残り何ターンで打てるかを配列で返す
function get_ssturn(fld, card, ally_n) {
	// SS1 default
	var ss1_def = card.ss1.turn;
	// SS2 default
	var ss2_def = (card.islegend ? card.ss2.turn : undefined);
	// SSチャージターン
	var cg = ally_n.ss_current;
	// 計算
	var ss1 = Math.max(ss1_def - cg, 0);
	var ss2 = ss2_def !== undefined ? (Math.max(ss2_def - cg, 0)) : undefined;
	// 返却
	return [ss1, ss2];
}

// 味方単体を指定するSSにおいて、誰が指定されているかを取得
function ss_allyselect_getindex(fld) {
	var istr = $("#sso_selected_index").text();
	return istr != "" ? Number(istr) : -1;
}

// 発動者以外の味方全員にnT行動不可(チャージ)を付与
function ss_add_chargenomove_otheruser(fld, turn, user_i) {
	var nows = fld.Allys.Now;
	for (var i = 0; i < nows.length; i++) {
		if (i == user_i) { continue; }
		var now = nows[i];
		now.turn_effect.push({
			desc: "チャージスキル待機",
			type: "ss_charge",
			icon: "force_reservior",// 後で変える(?)
			isdual: false,
			iscursebreak: false,	// 呪い解除されない
			isreduce_stg: true,		// ターン跨ぎでカウントが減る
			priority: 1,
			turn: turn,
			lim_turn: turn,
			ss_disabled: true,		// SS発動不可
			effect: function () { },
			// 攻撃無効
			bef_answer: function (f, as) {
				return false;
			},
			// 反射無効
			bef_skillcounter: function (f, ai) {
				return false;
			},
		});
	}
}

// SS発動可能かどうか
function is_ss_active(fld, i) {
	var dec = fld.Allys.Deck[i];
	var now = fld.Allys.Now[i];
	var sst = get_ssturn(fld, dec, now);
	var ss_disabled = $.grep(now.turn_effect, function (e) {
		return e.ss_disabled;
	}).length > 0;
	return !ss_disabled && (sst[0] == 0 || now.flags.ss_chargefin) && now.nowhp > 0 && !fld.Status.finish;
}

// 正解数関連
// 正解数を+1する、上限値に達していたらなにもしない
function addQuizCorrectNum(fld, c_i, add_v = 1){
	var crd = fld.Allys.Deck[c_i];
	var now = fld.Allys.Now[c_i];
	var max = calcQuizCorrectMax(fld, c_i);
	
	now.ss_quizcount = Math.min(now.ss_quizcount + add_v, max);
	return now.ss_quizcount;
}

// 正解数上限を返却
function calcQuizCorrectMax(fld, c_i){
	var card = fld.Allys.Deck[c_i];
	var now = fld.Allys.Now[c_i];
	var ss1_def = card.ss1.turn;
	var ss2_def = (card.islegend ? card.ss2.turn : 0);
	var is_ssfirst = now.ss_isfirst;
	var hasfast = has_fastnum(fld, card);
	var has2fst = has_secondfastnum(fld, card);
	var fast = is_ssfirst ? hasfast : has2fst;
	// この実装方法だとディスチャを被弾した際の処理がやや変なことになる気はする……
	// が、とりあえず実装
	
	return Math.max(ss1_def, ss2_def) - fast;
}

