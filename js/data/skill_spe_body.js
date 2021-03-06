// SS関数定義リスト
var SpSkill = {
	// -----------------------------
	// 敵全体に属性ダメージ
	"ss_damage_all": function (fld, n, cobj, params) {
		var r = params[0];
		var attrs = params[1];
		var ignore_counter = params[2];

		for (var a = 0; a < attrs.length; a++) {
			var atr = attrs[a];
			for (var i = 0; i < GetNowBattleEnemys(fld).length; i++) {
				// 攻撃
				ss_damage(fld, r, atr, 1, n, i, ignore_counter);
			}
		}
		return true;
	},
	// -----------------------------
	// 敵単体に属性ダメージ
	"ss_damage_s": function (fld, n, cobj, params) {
		var r = params[0];
		var attrs = params[1];
		var atkn = params[2];
		var ignore_counter = params[3];
		var enemys = GetNowBattleEnemys(fld);
		for (var an = 0; an < atkn; an++) {
			var atk_orders = $.map(attrs, function(e){
				return auto_attack_order(fld, enemys, e, n);
			});
			for (var a = 0; a < attrs.length; a++) {
				// 攻撃
				ss_damage(fld, r, attrs[a], atkn, n, atk_orders[a], ignore_counter);
			}
		}
		return true;
	},
	// -----------------------------
	// 敵全体に連撃ダメージ
	"ss_damage_all_cons": function (fld, n, cobj, params) {
		var r = params[0];
		var attrs = params[1];
		var atkn = params[2];
		var ignore_counter = params[3];
		var enemys = GetNowBattleEnemys(fld);
		for (var an = 0; an < atkn; an++) {
			for (var a = 0; a < attrs.length; a++) {
				for (var i = 0; i < enemys.length; i++) {
					// 攻撃
					ss_damage(fld, r, attrs[a], atkn, n, i, ignore_counter);
				}
			}
		}
		return true;
	},
	// -----------------------------
	// 敵単体に連撃&チェインプラス
	"ss_damage_slash": function (fld, n, cobj, params) {
		var r = params[0];
		var attrs = params[1];
		var atkn = params[2];
		var enemys = GetNowBattleEnemys(fld);
		for (var an = 0; an < atkn; an++) {
			var atk_orders = $.map(attrs, function(e){
				return auto_attack_order(fld, enemys, e, n);
			});
			for (var a = 0; a < attrs.length; a++) {
				// 攻撃
				ss_damage(fld, r, attrs[a], atkn, n, atk_orders[a], false);
				// チェイン封印されてなければチェインプラス
				if (fld.Status.chain_status != 2) {
					fld.Status.chain += 1;
					fld.log_push("チェインプラス(+1)");
				}
			}
		}
		return true;
	},
	// -----------------------------
	// 一閃斬撃大魔術
	"ss_damage_slash_all": function (fld, n, cobj, params) {
		var r = params[0];
		var attrs = params[1];
		var enemys = GetNowBattleEnemys(fld);
		var liv_en = $.grep(enemys, function(e){
			return e.nowhp > 0;
		}).length;
		var addch = Math.pow(2, liv_en) - 1;
		for (var a = 0; a < attrs.length; a++) {
			for (var i = 0; i < GetNowBattleEnemys(fld).length; i++) {
				// 攻撃
				ss_damage(fld, r, attrs[a], 1, n, i, false);
			}
		}
		// チェイン封印されてなければチェインプラス
		if (fld.Status.chain_status != 2) {
			fld.Status.chain += addch;
			fld.log_push("チェインプラス(+" + addch + ")");
		}
		return true;
	},
	// -----------------------------
	// 蓄積大魔術・聖
	"ss_accumulateDamageOfHeal": function (fld, n, cobj, params) {
		var max_r = params[0];
		var max_v = params[1];
		var attrs = params[2];

		var accHeal = fld.Status.accumulate_heal;
		var now = fld.Allys.Now[n];
		var accHealCount = now.accumulateHealCount;
		// 威力計算
		var acc_p = Math.min((accHeal - accHealCount)/max_v, 1);
		var {total} = getEnhanceRate(now);
		var rate = (acc_p * (max_r + total)) + 1;
		fld.log_push(`Unit[${n+1}]: 蓄積大魔術・聖(効果値: ${rate}/蓄積%: ${acc_p})`);
		
		var enemys = GetNowBattleEnemys(fld);
		for (var a = 0; a < attrs.length; a++) {
			var atr = attrs[a];
			var t_enemys = ss_get_targetenemy(fld, cobj, n, atr);
			for (var en = 0; en < t_enemys.length; en++) {
				// 攻撃
				var atk_order = enemys.indexOf(t_enemys[en]);
				var option = { is_noenhance: true };
				ss_damage(fld, rate, atr, 1, n, atk_order, false, option);
			}
		}

		// カウントを合わせる
		now.accumulateHealCount = accHeal;
		return true;
	},
	// -----------------------------
	// 蓄積大魔術・邪
	"ss_accumulateDamageOfBurn": function (fld, n, cobj, params) {
		var max_r = params[0];
		var max_v = params[1];
		var attrs = params[2];
		
		var accBurn = fld.Status.accumulate_dmg;
		var now = fld.Allys.Now[n];
		var accBurnCount = now.accumulateBurnCount;
		// 威力計算
		var acc_p = Math.min((accBurn - accBurnCount)/max_v, 1);
		var {total} = getEnhanceRate(now);
		var rate = (acc_p * (max_r + total)) + 1;
		fld.log_push(`Unit[${n+1}]: 蓄積大魔術・邪(効果値: ${rate}/蓄積%: ${acc_p})`);
		
		var enemys = GetNowBattleEnemys(fld);
		for (var a = 0; a < attrs.length; a++) {
			var atr = attrs[a];
			var t_enemys = ss_get_targetenemy(fld, cobj, n, atr);
			for (var en = 0; en < t_enemys.length; en++) {
				// 攻撃
				var atk_order = enemys.indexOf(t_enemys[en]);
				var option = { is_noenhance: true };
				ss_damage(fld, rate, atr, 1, n, atk_order, false, option);
			}
		}
		
		// カウントを合わせる
		now.accumulateBurnCount = accBurn;
		return true;
	},
	// -----------------------------
	// 蓄積大魔術・破
	"ss_accumulateDamageOfOverkill": function (fld, n, cobj, params) {
		var max_r = params[0];
		var max_v = params[1];
		var attrs = params[2];
		
		var accAsOK = fld.Status.accumulate_asok;
		var now = fld.Allys.Now[n];
		var accOverkillCount = now.accumulateASOverkillCount;
		// 威力計算
		var acc_p = Math.min((accAsOK - accOverkillCount)/max_v, 1);
		var {total} = getEnhanceRate(now);
		var rate = (acc_p * (max_r + total)) + 1;
		fld.log_push(`Unit[${n+1}]: 蓄積大魔術・破(効果値: ${rate}/蓄積%: ${acc_p})`);
		
		var enemys = GetNowBattleEnemys(fld);
		for (var a = 0; a < attrs.length; a++) {
			var atr = attrs[a];
			var t_enemys = ss_get_targetenemy(fld, cobj, n, atr);
			for (var en = 0; en < t_enemys.length; en++) {
				// 攻撃
				var atk_order = enemys.indexOf(t_enemys[en]);
				var option = { is_noenhance: true };
				ss_damage(fld, rate, atr, 1, n, atk_order, false, option);
			}
		}
		
		// カウントを合わせる
		now.accumulateASOverkillCount = accAsOK;
		return true;
	},
	// -----------------------------
	// 統一大魔術
	"ss_UnificationDamage": function (fld, n, cobj, params) {
		var r = params[0];
		var attrs = params[1];
		var enemys = GetNowBattleEnemys(fld);
		var t_enemys = ss_get_targetenemy(fld, cobj, n);
		for (var en = 0; en < t_enemys.length; en++) {
			for (var a = 0; a < attrs.length; a++) {
				// 攻撃
				var atr = attrs[a];
				var atk_order = enemys.indexOf(t_enemys[en]);
				ss_damage(fld, r, atr, 1, n, atk_order, false);
			}
		}
		return true;
	},
	// -----------------------------
	// 捕食大魔術
	"ss_QuizcorrectDamage": function(fld, n, cobj, params) {
		var rate_max = params[0];
		var count_max = params[1];
		var attrs = params[2];
		var correctSum = 0;
		// 自分以外のSS正解数を全消費
		var nows = fld.Allys.Now;
		for(var i=0; i < nows.length; i++){
			if(n != i){
				correctSum += nows[i].ss_quizcount;
				nows[i].ss_quizcount = 0;
				nows[i].ss_current = 0;         // reset(2ndfast ignore)
			}
		}
		// 効果値を計算
		var {total} = getEnhanceRate(nows[n]);
		var rate = (rate_max + total) * Math.min(correctSum/count_max, 1) + 1;
		fld.log_push(`Unit[${n+1}]: 捕食大魔術(効果値: ${rate}/捕食数: ${correctSum}/${count_max})`);
		
		var enemys = GetNowBattleEnemys(fld);
		for (var a = 0; a < attrs.length; a++) {
			var atr = attrs[a];
			var t_enemys = ss_get_targetenemy(fld, cobj, n, atr);
			for (var en = 0; en < t_enemys.length; en++) {
				// 攻撃
				var atk_order = enemys.indexOf(t_enemys[en]);
				var option = { is_noenhance: true };
				ss_damage(fld, rate, atr, 1, n, atk_order, false, option);
			}
		}
	},
	// -----------------------------
	// パネル爆破大魔術
	"ss_PanelBurningDamage": function(fld, n, cobj, params){
		var rate = params[0];
		var ps = fld.Status.panel_color;
		// パネルが4枚指定されている状況なら、パネル選択を省略
		// そうでない状況なら、暫定的にエラーを出しておく
		if(ps.length != 4){
			ss_object_done(fld, n,
				ss_undefined("パネル爆破大魔術", 
					"現在、パネル爆破大魔術はパネル変換と併用する前提の実装となっています。" +
					"実装まで今しばらくお待ち下さい。"
				)
			);
		}
		else {
			// 効果値をここで計算
			var now = fld.Allys.Now[n];
			var enemys = GetNowBattleEnemys(fld);
			var {total} = getEnhanceRate(now);
			var hits = ArrayMath.sum(ps.map((p) => {
				return ArrayMath.sum(p.filter((e) => e > 0));
			}));
			var r = rate + (total / (hits));
			fld.log_push(`Unit[${n+1}]: パネル爆破大魔術(効果値: ${r * 100}%)`);
			ps.forEach((p) => {
				p.forEach((e, atr) => {
					if(e > 0){
						// 各パネル色で順に攻撃
						// 攻撃
						var t_enemys = ss_get_targetenemy(fld, cobj, n, atr);
						for (var en = 0; en < t_enemys.length; en++) {
							var atk_order = enemys.indexOf(t_enemys[en]);
							var option = { is_noenhance: true };
							ss_damage(fld, r, atr, 1, n, atk_order, false, option);
						}
					}
				})
			});
			// パネル処理があるならここで実行
			fld.Status.continue_eff
				.filter(e => e.type.indexOf("panel_reserve") >= 0)
				.forEach(e => e.effectOnAppear(fld, -1, e));
		}
		return true;
	},
	// -----------------------------
	// 敵単体に属性ダメージ
	"ss_damage_explosion": function (fld, n, cobj, params) {
		var r = params[0];
		var attrs = params[1];
		var enemys = GetNowBattleEnemys(fld);
		for (var a = 0; a < attrs.length; a++) {
			var atr = attrs[a];
			var t_enemys = ss_get_targetenemy(fld, cobj, n, atr);
			for (var en = 0; en < t_enemys.length; en++) {
				// 攻撃
				var atk_order = enemys.indexOf(t_enemys[en]);
				ss_damage(fld, r, atr, 1, n, atk_order, false);
			}
		}
		return true;
	},
	// -----------------------------
	// 敵全体にダメージ&残滅ダメージ
	"ss_continue_damage": function (fld, n, cobj, params) {
		var dmg_r = params[0];
		var cont_r = params[1];
		var attrs = params[2];
		var turn = params[3];
		// SS
		var card = fld.Allys.Deck[n];
		var now = fld.Allys.Now[n];
		var ss = is_legendmode(fld, card, now) ? card.ss2 : card.ss1;
		// 参照用にコピーを取る
		var init_now = $.extend(true, {}, fld.Allys.Now[n]);
		// 普通のダメージ
		var sda = ss_damage_all(dmg_r + 1, attrs, false);
		fld.log_push("Unit[" + (n + 1) + "]: 継続ダメージSS(威力: " + dmg_r * 100 + ")");
		ss_object_done(fld, n, sda);
		// 継続効果追加
		ss_continue_effect_add(fld, {
			type: "continue_damage",
			turn: turn,
			lim_turn: turn,
			index: n,
			effect: function(f, oi, ceff){
				var en_lived = GetNowBattleEnemys(f).filter(e => e.nowhp > 0).length;
				// 発動時の攻撃力などをコピーする
				var eff_now = $.extend(true, {}, f.Allys.Now[n]);
				f.Allys.Now[oi] = init_now;
				// 継続ダメージ
				f.log_push("Unit[" + (n + 1) + "]: 継続ダメージ発動(" + (cont_r * 100) + ") - 残り" + ceff.lim_turn + "t");
				var sda = ss_damage_all(cont_r + 1, attrs, true);
				ss_object_done(f, n, sda);
				// コピーを解除
				f.Allys.Now[oi] = eff_now;
				// Ch+
				var en_living = GetNowBattleEnemys(f).filter(e => e.nowhp > 0).length;
				var addch = en_lived - en_living;
				if(ss.chadd_killing > 0 && (addch > 0)){
					fld.Status.chain += addch * ss.chadd_killing;
					fld.log_push("チェイン付与: +" + addch);
				}
				
				// SS状況を解除
				var es = GetNowBattleEnemys(f);
				for (var i = 0; i < es.length; i++) {
					es[i].flags.is_ss_attack = false;
				}
			}
		});
		return true;
	},
	// -----------------------------
	// 連鎖解放大魔術
	"ss_burst_attack": function (fld, n, cobj, params) {
		var base_r = params[0];
		var max_r = params[1];
		var max_ch = params[2];
		var attrs = params[3];
		var exp_c = (params[4] || 1); // 修正前2.5
		// 参照用にコピーを取る
		var now_state = $.extend(true, {}, fld.Allys.Now[n]);
		// 継続効果追加
		ss_continue_effect_add(fld, {
			type: "burst_attack",
			turn: 999,
			lim_turn: 999,
			index: n,
			effect: function(f, oi, ceff){
				// 全滅しているなら次の戦闘に持ち越す
				if (is_allkill(f)) {
					return;
				}
				// 発動時の攻撃力などをコピーする
				var f_copy = $.extend(true, {}, f);
				f.Allys.Now[oi] = now_state;
				// 効果値計算
				var nowch = Math.min(f.Status.chain, max_ch);
				var rate = Math.floor((base_r + max_r * Math.pow(nowch / max_ch, exp_c)) * 100) / 100;
				// チェインを0に指定
				f.Status.chain = f_copy.Status.chain = 0;
				// 攻撃
				var sda = ss_damage_all(rate, attrs, true);
				ss_object_done(f, n, sda);
				f.log_push("Unit[" + (n + 1) + "]: 連鎖解放大魔術-発動(効果値: " + (rate * 100) + ")");
				// SS状況を解除
				var es = GetNowBattleEnemys(f);
				for (var i = 0; i < es.length; i++) {
					es[i].flags.is_ss_attack = false;
				}
				f.Allys.Now[oi] = f_copy.Allys.Now[oi];
				// 継続効果を解除
				ceff.lim_turn = 0;
			}
		});
		fld.log_push("Unit[" + (n + 1) + "]: 連鎖解放大魔術-設置");
		return true;
	},
	// -----------------------------
	// 割合ダメージ
	"ss_ratiodamage": function (fld, n, cobj, params) {
		var ratio = params[0];
		var enemys = ss_get_targetenemy(fld, cobj, n);
		for (var i = 0; i < enemys.length; i++) {
			var e = enemys[i];
			var dmg = Math.floor(e.nowhp * ratio);
			e.nowhp = Math.max(e.nowhp - dmg, 0);
			// SSフラグを立てる
			e.flags.is_ss_attack = true;
			// ダメージを与えた
			e.flags.on_damage = true;
			fld.log_push("Enemy[" + (i + 1) + "]: 割合ダメージ(" + (ratio * 100) + "%)(" + dmg + "ダメージ)");
		}
		return true;
	},
	// -----------------------------
	// 全体遅延
	"ss_delay": function(fld, n, cobj, params){
		var turn = params[0];
		var enemys = ss_get_targetenemy(fld, cobj, n);
		for (var i = 0; i < enemys.length; i++) {
			(function () {
				var indx = i;
				var e = enemys[indx];
				if (e.nowhp <= 0 || !e.move) { return; }
				if (e.move.turn && !e.flags.isdelay) {
					e.flags.isdelay=true;
					e.move.turn=e.move.turn+turn;
					// 遅延デバフを付与
					e.turn_effect.push({
						desc: `遅延`,
						type: "move_delay",
						icon: null,
						isdual: false,
						turn: turn,
						lim_turn: turn,
						effect: function(f, ei, teff, is_end, is_t, is_b){
						}
						
					});
					fld.log_push("Enemy[" + (i + 1) + "]: 遅延(+" + turn + "ターン)");
				}
			})();
			// SSフラグを立てる
			enemys[i].flags.is_ss_attack = true;
		}
		return true;
	},
	// -----------------------------
	// スキルカウンター待機
	"ss_skillcounter": function (fld, n, cobj, params) {
		var rate = params[0];
		var turn = params[1];
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			if (now.nowhp <= 0) { continue; }
			now.turn_effect.push({
				desc: "スキルカウンター待機(" + (rate * 100) + "%)",
				type: "ss_skill_counter",
				icon: "skill_counter",
				isdual: false,
				iscursebreak: true,
				turn: turn,
				lim_turn: turn,
				// スキルカウンター定義
				effect: function(){},
				counter: function (f, oi, teff, state, is_t, is_b) {
					var card = f.Allys.Deck[oi];
					var now_e = f.Allys.Now[oi];
					var sc_flag = now_e.flags.skill_counter;
					// スキルカウンター前行動
					var is_sc_cancel = $.grep(now_e.turn_effect, function (e) {
						return e.bef_skillcounter && !e.bef_skillcounter(f, oi);
					}).length > 0;
					if (is_t && !is_b && sc_flag.length > 0) {
						if (!is_sc_cancel) {
							f.log_push("Unit[" + (oi + 1) + "]: スキルカウンター発動(" + (rate * 100) + "%)");
							// スキルカウンター対象の敵の数だけ繰り返す
							for (var sci = 0; sci < sc_flag.length; sci++) {
								if (!sc_flag[sci]) { continue; }
								for (var atri = 0; atri < card.attr.length; atri++) {
									// 攻撃
									if (card.attr[atri] >= 0) {
										ss_damage(f, rate, card.attr[atri], 1, oi, sci, true);
										GetNowBattleEnemys(fld, sci).flags.on_damage = true;
									}
								}
							}
						}
						// スキル反射フラグを解除
						f.Allys.Now[oi].flags.skill_counter = [];
					}
				},
			});
		}
		fld.log_push("スキルカウンター待機(" + (rate * 100) + "%, " + turn + "t)");
		return true;
	},
	// -----------------------------
	// 多段式カウンター待機
	"ss_dualcounter": function (fld, n, cobj, params) {
		var turn = params[0];
		var r = params[1] || 0;
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			if (now.nowhp <= 0) { continue; }
			now.turn_effect.push({
				desc: `多段式カウンター待機(効果値: ${r})`,
				type: "ss_dual_counter",
				icon: "attack_counter_dual",
				isdual: false,
				iscursebreak: true,
				turn: turn,
				lim_turn: turn,
				// 多段式カウンター定義
				effect: function(){},
				counter: function (f, oi, teff, state, is_t, is_b) {
					var card = f.Allys.Deck[oi];
					var now_e = f.Allys.Now[oi];
					var dmg_flag = now_e.flags.damage_hits;
					// 多段式カウンター前行動
					var is_sc_cancel = $.grep(now_e.turn_effect, function (e) {
						return e.bef_skillcounter && !e.bef_skillcounter(f, oi);
					}).length > 0;
					if (is_t && !is_b && dmg_flag.length > 0) {
						if (!is_sc_cancel) {
							f.log_push(`Unit[${(oi+1)}]: 多段式カウンター発動(効果値: ${r})`);
							// 多段カウンター対象の敵の数だけ繰り返す
							for (var sci = 0; sci < dmg_flag.length; sci++) {
								if (!dmg_flag[sci]) { continue; }
								// 攻撃された回数だけ攻撃
								for (var atk_ct = 0; atk_ct < dmg_flag[sci]; atk_ct++) {
									for (var atri = 0; atri < card.attr.length; atri++) {
										if (card.attr[atri] >= 0) {
											ss_damage(f, 1 + r, card.attr[atri], 1, oi, sci, true);
										}
									}
									GetNowBattleEnemys(fld, sci).flags.on_damage = true;
								}
							}
						}
						// ダメージ反射フラグを解除
						f.Allys.Now[oi].flags.damage_hits = [];
					}
				},
			});
		}
		fld.log_push(`多段式カウンター待機(効果値: ${r}/${turn}T)`);
		return true;
	},
	// -----------------------------
	// 敵全体に毒ダメージを与える
	"poison": function (fld, n, cobj, params) {
		var dmg = params[0];
		var t = params[1];
		var enemys = ss_get_targetenemy(fld, cobj, n);
		for (var i = 0; i < enemys.length; i++) {
			var en = enemys[i];
			if (en.nowhp > 0) { 
				en.turn_effect.push({
					desc: "毒(" + dmg + ")",
					type: "poison",
					icon: "poison",
					isdual: false,
					turn: t,
					lim_turn: t,
					is_poison: true,
					effect: function (f, ei, teff, state, is_t, is_b, is_ss) {
						var e = GetNowBattleEnemys(f, ei);
						if (is_t && !is_b) {
							e.nowhp = Math.max(e.nowhp - dmg, 0);
							e.flags.on_damage = true;
							f.log_push("Enemy[" + (ei + 1) + "]: 毒(" + dmg + "ダメージ)");
							if (e.nowhp <= 0) {
								// 死亡時行動
								enemy_check_ondead(f);
								// 敵スキルを全て解除
								turneff_allbreak_enemy(fld, e.turn_effect, ei);
							}
						}
					},
				});
				// SSフラグを立てる
				en.flags.is_ss_attack = true;
			}
		}
		return true;
	},
	// -----------------------------
	// 時限大魔術
	"ss_damage_timebomb": function (fld, n, cobj, params) {
		var rate = params[0];
		var attrs = params[1];
		var atkn = params[2];
		var t = params[3];
		var enemys = ss_get_targetenemy(fld, cobj, n);
		for (var i = 0; i < enemys.length; i++) {
			var en = enemys[i];
			if (en.nowhp <= 0) { return; }
			en.turn_effect.push({
				desc: "時限大魔術",
				type: "ss_damage_timebomb",
				icon: null,
				isdual: true,
				turn: t,
				lim_turn: t,
				effect: function (f, ei, teff, is_end, is_t, is_b) {
					// 残りターンが0なら発動
					if (is_end === true) {
						// 発動時の攻撃力などをコピーする
						var f_copy = $.extend(true, {}, f);
						var fc_card = f_copy.Allys.Deck[n];
						var fc_now = f_copy.Allys.Now[n];
						var enemy = GetNowBattleEnemys(f, ei);
						var dmg = function(card, now, atk, chain){
							var rst = 0;
							for(var attr in attrs){
								var {total} = getEnhanceRate(now);
								var r = (rate + total + 1 + chain/100);
								var adv = Awake_get_multiple(f, card, now);
								var mgn = attr_magnification(attr, enemy.attr);
								var dmg_tmp = Math.floor(Math.floor(atk * r) * mgn * adv);
								rst +=  checkFunctionOnAttack(f, enemy, dmg_tmp, attr, false, false);
							}
							return rst;
						}(fc_card, fc_now, fc_now.atk, f_copy.Status.chain);
						// 着火
						f.log_push("Enemy[" + (ei + 1) + "]: 時限大魔術 - 残り0t");
						constDamageToEnemy(f, enemy, dmg, n, ei);
					}
				},
			});
			// SSフラグを立てる
			en.flags.is_ss_attack = true;
		}
		return true;
	},
	// -----------------------------
	// 無に還す瞳
	"ss_death_limit": function (fld, n, cobj, params) {
		var t = params[0];
		cobj = { "target": "single" };
		var enemys = ss_get_targetenemy(fld, cobj, n);
		for (var i = 0; i < enemys.length; i++) {
			var en = enemys[i];
			if (en.nowhp <= 0) { return; }
			en.turn_effect.push({
				desc: "無に還す瞳",
				type: "death_limit",
				icon: "death_limit",
				isdual: false,
				turn: t,
				lim_turn: t,
				effect: function (f, ei, teff, is_end, is_t, is_b) {
					var e = GetNowBattleEnemys(f, ei);
					// 残りターンが0ならHPを0に
					if (is_end === true) {
						f.log_push("Enemy[" + (ei + 1) + "]: 無に還す瞳 - 残り0t");
						e.nowhp = 0;
						// 死亡時行動を実行させる
						enemy_check_ondead(f);
						// 敵スキルを全て解除
						turneff_allbreak_enemy(fld, e.turn_effect, ei);
					}
				},
			});
			// SSフラグを立てる
			en.flags.is_ss_attack = true;
		}
		return true;
	},
	// -----------------------------
	// 属性弱体化効果を付与
	"ss_attr_weaken": function (fld, n, cobj, params) {
		var enemys = ss_get_targetenemy(fld, cobj, n);
		var attr = params[0];
		var rate = params[1];
		var turn = params[2];
		var teff_obj = {
			desc: "[" + get_attr_string(attr, "/") + "]弱体化",
			type: "attr_weaken",
			icon: "attr_weaken",
			isdual: false,
			turn: turn,
			lim_turn: turn,
			effect: function () { },
			priority: 2,
			on_damage: function (f, dmg, a_i) {
				if (attr[a_i] > 0) {
					return dmg * (1 + rate);
				} else {
					return dmg;
				}
			}
		};
		for (var tg = 0; tg < enemys.length; tg++) {
			var en = enemys[tg];
			if (en.nowhp <= 0) { continue; }
			en.turn_effect.push($.extend(true, {}, teff_obj));
			// SSフラグを立てる
			en.flags.is_ss_attack = true;
		}
		return true;
	},
	// -----------------------------
	// エンハンス効果を付与
	"ss_enhance": function (fld, n, cobj, params) {
		var baserate = params[0];
		var t = params[1];
		var attr = params[2];
		var calltype = params[3];
		// var is_own = false;
		if (!attr) {
			attr = [1,1,1,1,1];
		}
		var cds = ss_get_targetally(fld, cobj, fld.Allys.Deck, n);
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var rate = baserate;
			var cd = cds[i];
			var now = nows[i];
			var n_index = fld.Allys.Now.indexOf(now);
			if (now.nowhp > 0 && (/*is_own ||*/ attr[cd.attr[0]] > 0)) {
				switch (calltype) {
					case "RF":
						var isreinforce = true;
						var typestr = "[精霊強化]"
						var rate_awplusRF = pickup_awakes(fld, fld.Allys.Deck[n], "awake_rateup_enhanceRF", false);
						$.each(rate_awplusRF, function(i, e){
							rate += e.upvalue / 100;
						});
						break;
					case "aseffect":
						var isaseffect = true;
						var isreduce_stg = true;
						var typestr = "[AS変化]"
						break;
					case "null":
						return null;
					case "SS":
					default:
						var typestr = ""
						break;
				}
				// 付与
				now.turn_effect.push({
					desc: "攻撃力アップ" + typestr + "(" + (rate * 100) + "%)",
					type: "ss_enhance" + calltype,
					icon: "enhance",
					isdual: false,
					iscursebreak: true,
					isreinforce,
					isreduce_stg,
					isaseffect,
					turn: t,
					lim_turn: t,
					target_attr: attr,
					effect: function (f, oi, teff, state) {
						var card = f.Allys.Deck[oi];
						var desc = "攻撃力アップ" + typestr + "(" + (rate * 100) + "%)";
						// エンハンスの対応属性と一致していないなら説明文変更/効果無効化
						if(teff.target_attr[card.attr[0]] <= 0 && !teff.isreinforce){
							teff.desc = desc + "[属性不一致:無効]";
							f.Allys.Now[oi].ss_enhance = 0;
							return;
						} else {
							teff.desc = desc;
						}
						// 対象listup
						var targetListup = "ss_enhance";
						if(teff.isreinforce){
							targetListup = "ss_reinforcement_atk";
						} else if(teff.isaseffect){
							targetListup = "ss_aseffect_atk";
						}
						
						// 初回実行時にエンハ値を代入
						if (state == "first") {
							f.Allys.Now[oi][targetListup] = rate;
						}
						// 解除時にエンハ値を0にする(overrideは見ない[別の値代入の恐れがあるため])
						if (state == "end" || state == "dead" || state == "break") {
							f.Allys.Now[oi][targetListup] = 0;
						}
					},
				});
				fld.log_push("Unit[" + (n_index + 1) + "]: 攻撃力Up" + typestr + "(" + (rate * 100) + "%, " + t + "t)");
			}
		}
		return true;
	},
	// -----------------------------
	// エンハンス効果を付与(副属性込み)
	"ss_enhance_subattr": function (fld, n, cobj, params) {
		var r = params[0];
		var s_r = params[1];
		var t = params[2];
		var attr = params[3];
		var s_attr = params[4];
		var calltype = params[5];
		var cds = ss_get_targetally(fld, cobj, fld.Allys.Deck, n);
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var cd = cds[i];
			var now = nows[i];
			if (now.nowhp > 0 && attr[cd.attr[0]] > 0) {
				// check type
				switch (calltype) {
					case "RF":
						var isreinforce = true;
						var typestr = "[精霊強化]"
						break;
					case "aseffect":
						var isaseffect = true;
						var isreduce_stg = true;
						var typestr = "[AS変化]"
						break;
					case "null":
						return null;
					case "SS":
					default:
						var typestr = ""
						break;
				}
				// check rate
				var rate = (s_attr[cd.attr[1]] > 0) ? s_r : r;
				// 付与
				now.turn_effect.push({
					desc: "攻撃力アップ" + typestr + "(" + (rate * 100) + "%)",
					type: "ss_enhance" + calltype,
					icon: "enhance",
					isdual: false,
					iscursebreak: true,
					isreinforce,
					isreduce_stg,
					isaseffect,
					turn: t,
					lim_turn: t,
					up_rate: rate,
					target_attr: attr,
					target_sattr: (rate == s_r ? s_attr : [1,1,1,1,1]),
					effect: function (f, oi, teff, state) {
						var card = f.Allys.Deck[oi];
						var desc = "攻撃力アップ" + typestr + "(" + (teff.up_rate * 100) + "%)";
						// エンハンスの対応属性と一致していないなら説明文変更/効果無効化
						if(teff.target_attr[card.attr[0]] <= 0 && !teff.isreinforce){
							teff.desc = desc + "[属性不一致:無効]";
							f.Allys.Now[oi].ss_enhance = 0;
							return;
						} else {
							teff.desc = desc;
						}
						// 対象listup
						var targetListup = "ss_enhance";
						if(teff.isreinforce){
							targetListup = "ss_reinforcement_atk";
						} else if(teff.isaseffect){
							targetListup = "ss_aseffect_atk";
						}
						
						// 初回実行時にエンハ値を代入
						if (state == "first") {
							f.Allys.Now[oi][targetListup] = rate;
						}
						// 解除時にエンハ値を0にする(overrideは見ない[別の値代入の恐れがあるため])
						if (state == "end" || state == "dead" || state == "break") {
							f.Allys.Now[oi][targetListup] = 0;
						}
					},
				});
				fld.log_push("Unit[" + (i + 1) + "]: 攻撃力Up" + typestr + "(" + (rate * 100) + "%, " + t + "t)");
			}
		}
		return true;
	},
	// -----------------------------
	// ブーストエンハンスをかける
	"ss_boost_enhance": function (fld, n, cobj, params) {
		var rate = params[0];
		var t = params[1];
		var dmg = params[2];
		var attr = params[3];
		if (!attr) {
			// 属性未指定なら全属性Up
			attr = [1, 1, 1, 1, 1];
		}
		var cds = ss_get_targetally(fld, cobj, fld.Allys.Deck, n);
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var cd = cds[i];
			var now = nows[i];
			var n_index = fld.Allys.Now.indexOf(now);
			if (now.nowhp > 0 && attr[cd.attr[0]] > 0) {
				now.turn_effect.push({
					desc: "攻撃力アップ[ブースト](" + (rate * 100) + "%)",
					type: "ss_boost_enhance",
					icon: "enhance_boost",
					isdual: false,
					iscursebreak: true,
					turn: t,
					lim_turn: t,
					target_attr: attr,
					effect: function (f, oi, teff, state, is_t, is_ak, is_ss) {
						if (state == "first") {
							f.Allys.Now[oi].ss_boost_enhance = rate;
						}
						else if (state == "end" || state == "dead" || state == "break" || state == "overlay") {
							f.Allys.Now[oi].ss_boost_enhance = 0;
						}
						else if (is_t && !is_ss && !f.Status.finish) {
							// 自傷
							var sco = ss_consume_own(dmg)
							ss_object_done(f, oi, sco);
						}
					},
				});
				fld.log_push("Unit[" + (n_index + 1) + "]: 自身攻撃力Up[Boost](" +
					(rate * 100) + "%, " + t + "t, dmg: " + (dmg * 100) + "%)");
			}
		}
		return true;
	},
	// -----------------------------
	// 凶暴化をかける
	"ss_berserk": function (fld, n, cobj, params) {
		var t = params[0];
		var cds = ss_get_targetally(fld, cobj, fld.Allys.Deck, n);
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var cd = cds[i];
			var now = nows[i];
			var n_index = fld.Allys.Now.indexOf(now);
			if (now.nowhp > 0) {
				now.turn_effect.push({
					desc: "凶暴化",
					type: "ss_berserk",
					icon: "ss_berserk",
					isdual: false,
					iscursebreak: true,
					turn: t,
					lim_turn: t,
					panic_target: true,
					isberserk: true,
					effect: function (f, oi, teff, state, is_t, is_ak, is_ss) {},
					on_answer_dmg: function(f, oi, dmg){
						return dmg * 3;
					}
				});
				fld.log_push("Unit[" + (n_index + 1) + "]: 凶暴化");
			}
		}
		return true;
	},
	// -----------------------------
	// チェインを消費してエンハンス効果を付与
	"ss_chain_enhance": function (fld, n, cobj, params) {
		var rate = params[0];
		var redch = params[1];
		var t = params[2];
		var nows = fld.Allys.Now;
		// チェイン消費してエンハンスをかける処理の関数
		var fc_ch_enhance = function(f, nows, is_ssfin){
			var isdone = f.Status.chain >= redch;
			if(isdone && !is_ssfin){
				// 発動
				var ch_bef = f.Status.chain;
				var ch_aft = Math.max(ch_bef - redch, 0);
				var sea = ss_enhance_all(rate, 1, [1,1,1,1,1]);
				ss_object_done(f, n, sea);
				// チェイン減少
				f.Status.chain = ch_aft;
				f.log_push("チェイン犠牲強化(適用)[" + ch_bef + "→" + ch_aft + "]");
			}
			else {
				// 不発
				f.log_push("チェイン犠牲強化適用(不発)");
			}
		}
		// 継続効果追加
		ss_continue_effect_add(fld, {
			type: "chain_enhance",
			turn: t,
			lim_turn: t,
			index: n,
			effect: function(f, oi, ceff, is_ssfin){
				fc_ch_enhance(f, f.Allys.Now, is_ssfin);
			}
		});
		// 発動時にもエンハンス処理を実行
		fc_ch_enhance(fld, fld.Allys.Now);
		return true;
	},
	// -----------------------------
	// 撃破した敵数に応じてエンハンス効果を付与
	"ss_kill_enhance": function (fld, n, cobj, params) {
		var rate_st = params[0];
		var rate_up = params[1];
		var rate_mx = params[2];
		var t = params[3];
		var cds = ss_get_targetally(fld, cobj, fld.Allys.Deck, n);
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var cd = cds[i];
			var now = nows[i];
			var n_index = fld.Allys.Now.indexOf(now);
			var kill_st = fld.Status.total_kill;
			if (now.nowhp <= 0) {
				continue;
			}
			// 付与
			var desc_tx = (r) => {
				return `撃破強化(${(r*100).toFixed(0)}%)`;
			}
			now.turn_effect.push({
				desc: desc_tx(rate_st),
				type: "ss_enhance", // 普通のエンハンスと重複しないので同じss_enhance
				icon: "enhance",
				isdual: false,
				iscursebreak: true,
				turn: t,
				lim_turn: t,
				effectAlways: true,
				effect: function(f, oi, teff, state){
					// 解除条件に当てはまっていた場合、後処理して終了
					if (["end", "dead", "break"].indexOf(state) >= 0) {
						f.Allys.Now[oi].ss_enhance = 0;
					}
					else if(state == "first" || state == ""){
						// 撃破数取得
						var killnum = f.Status.total_kill - kill_st;
						// 効果値上書き
						var rate = Math.min(rate_st + killnum * rate_up, rate_mx);
						teff.desc = desc_tx(rate);
						f.Allys.Now[oi].ss_enhance = rate;
					}
				},
			});
		}
		fld.log_push("Unit[" + (n + 1) + "]: 撃破強化");
		return true;
	},
	// -----------------------------
	// ASエンハンス効果を味方全体に付与する
	"ss_asenhance": function(fld, n, cobj, params) {
		var rate_max = params[0];
		var target_mattr = params[1];
		var target_sattr = params[2];
		var t = params[3];

		// 属性一致判定
		var is_match_attr = (c) => {
			return (target_mattr[c.attr[0]] > 0) && (target_sattr[c.attr[1]] > 0);
		}
		
		/*
		 * produce up_rates
		 * [1, 1.2, 1.3,  1.4, 1.5,  3.0] (rate_max == 3)
		 * [1, 1.1, 1.15, 1.2, 1.25, 2.0] (rate_max == 2)
		 */
		const up_rates = [0, 0.1, 0.15, 0.2, 0.25, 1.0].map(x => x * (rate_max - 1) + 1);
		var in_attrnum = $.grep(fld.Allys.Deck, is_match_attr).length;
		var rate = up_rates[in_attrnum];
		
		var cds = ss_get_targetally(fld, cobj, fld.Allys.Deck, n);
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var cd = cds[i];
			var now = nows[i];
			var n_index = fld.Allys.Now.indexOf(now);
			if (now.nowhp <= 0 || !is_match_attr(cd)) {
				continue;
			}
			// 付与
			now.turn_effect.push({
				desc: `AS倍率強化(${(rate*100).toFixed(0)}%)`,
				type: "ss_asenhance",
				icon: "asenhance",
				isdual: false,
				iscursebreak: true,
				turn: t,
				lim_turn: t,
				effect: function(f, oi, teff, state){},
				on_answer_dmg: function(f, oi, dmg){
					var c = f.Allys.Deck[oi];
					if(is_match_attr(c)){
						return dmg * rate;
					} else {
						return dmg;
					}
				}
			});
		}
		fld.log_push("Unit[" + (n + 1) + "]: AS倍率強化");
		return true;
	},
	// -----------------------------
	// 精霊強化効果を味方全体に付与する
	"ss_reinforcement": function (fld, oi, cobj, params) {
		// paramsにssの配列を書いて、全て実行する
		var t = params[0];
		var skills = $.extend(true, [], cobj.p2);
		var all_done = function(f, state, is_t, is_ak){
			var sss = skills;
			for(n=0; n < sss.length; n++){
				ss_object_done(f, oi, sss[n]);
			}
			// 精霊強化が実行関数に未指定ならそれも行う
			var rate_awplusRF = pickup_awakes(fld, f.Allys.Deck[oi], "awake_rateup_regenerateRF", false);
			var rate_enhplusRF = pickup_awakes(fld, f.Allys.Deck[oi], "awake_rateup_enhanceRF", false);
			var isexist_regenerate = $.grep(sss, function(e){
				return e.name == "ss_regenerate";
			}).length > 0;
			var isexist_enhance = $.grep(sss, function(e){
				return e.name == "ss_enhance";
			}).length > 0;
			if(rate_awplusRF.length > 0 && !isexist_regenerate){
				ss_object_done(f, oi, ss_regenerate(0, 1, "RF"));
			}
			if(rate_enhplusRF.length > 0 && !isexist_enhance){
				ss_object_done(f, oi, ss_enhance_all(0, 1, [1,1,1,1,1] ,"RF"));
			}
			
			// dup-remove
			var nows = f.Allys.Now;
			for(n=0; n < nows.length; n++) {
				turn_effect_check_onlyfirst(fld, nows[n], n);
				if (is_ak) {
					turneff_break_dual(fld, nows[n].turn_effect, n, true);
				}
				// statusup-remove
				turneff_break_dual_settype(fld, nows[n].turn_effect, n, "ss_statusup", true);
			}
		}
		// 自身に行動不能効果を付与
		fld.Allys.Now[oi].turn_effect.push({
			desc: "行動不能[精霊強化]",
			type: "ss_reactionaly_noaction",
			icon: "reinforcement",
			isdual: false,
			iscursebreak: false,	// 呪い解除されない
			isreduce_stg: false,	// ターン跨ぎでカウントが減らない
			effect: function (f, oi, teff, state, is_t, is_ak, is_ss) {
				if (state != "end" && state != "dead" && is_t && !is_ss) {
					all_done(f, state, is_t, is_ak);
				}
			},
			turn: t,
			lim_turn: t,
			ss_disabled: true,		// SS発動不可
			// 攻撃無効
			bef_answer: function (f, as) {
				return false;
			},
			// 反射無効
			bef_skillcounter: function (f, ai) {
				return false;
			},
		});
		all_done(fld, "", false, false);
		return true;
	},
	// -----------------------------
	// ステアップ
	"ss_statusup": function (fld, n, cobj, params) {
		// ステアップの上限値をfield.status.statusup_maxにセット
		{
			var stmax = fld.Status.statusup_max;
			stmax[0] = Math.max(stmax[0], params[1][0]);
			stmax[1] = Math.max(stmax[1], params[1][1]);
		}
		var t = params[2];
		var attr = params[3];
		var cards = ss_get_targetally(fld, cobj, fld.Allys.Deck, n);
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var up_arrs = $.extend(true, {}, params[0]);
			var up_limit = fld.Status.statusup_max;
			var card = cards[i];
			var now = nows[i];
			if (now.nowhp <= 0) {
				continue;
			}
			if (attr && attr[card.attr[0]] <= 0){
				continue;
			}
			// 既にかかってるステアップの値を取得する
			$.each(now.turn_effect, function (i, e) {
				if (e.type == "ss_statusup") {
					up_arrs[0] += e.up_hp;
					up_arrs[1] += e.up_atk;
				}
			});
			// 上限に達してたら上限に合わせる
			up_arrs[0] = Math.min(up_arrs[0], up_limit[0]);
			up_arrs[1] = Math.min(up_arrs[1], up_limit[1]);
			// 出力
			now.turn_effect.push({
				desc: "ステータスアップ(HP: " + up_arrs[0] + "/ATK: " + up_arrs[1] + ")",
				type: "ss_statusup",
				icon: "statusup",
				subicon: "statusup_atk",
				isdual: false,
				iscursebreak: true,
				turn: t,
				lim_turn: t,
				up_hp: up_arrs[0],
				up_atk: up_arrs[1],
				effect: function (f, oi, teff, state) {
					var nowtg = f.Allys.Now[oi];
					if (state == "first") {
						// 上昇値にステアップ影響分を追加
						nowtg.upval_hp += teff.up_hp;
						nowtg.upval_atk += teff.up_atk;
						nowtg.maxhp = Math.max(nowtg.def_awhp + nowtg.upval_hp, 1);
						nowtg.nowhp = Math.min(nowtg.nowhp + Math.max(params[0][0], 0), nowtg.maxhp);
						nowtg.atk = Math.max(nowtg.def_awatk + nowtg.upval_atk, 0);
						// iconset
						teff.icon = (teff.up_hp > 0 ? "statusup" : teff.up_hp < 0 ? "statusdown" : null);
						teff.subicon = (teff.up_atk > 0 ? "statusup_atk" : teff.up_atk < 0 ? "statusdown_atk" : null);
					}
					else if (state == "end" || state == "dead" | state == "overlay" || state == "break") {
						// ステアップ影響分を引く
						nowtg.upval_hp -= teff.up_hp;
						nowtg.upval_atk -= teff.up_atk;
						nowtg.maxhp = Math.max(nowtg.def_awhp + nowtg.upval_hp, 1);
						nowtg.nowhp = Math.min(nowtg.maxhp, nowtg.nowhp);
						nowtg.atk = Math.max(nowtg.def_awatk + nowtg.upval_atk, 0);
					}
				},
			});
			fld.log_push("Unit[" + (i + 1) + "]: ステータスUp(HP:" + up_arrs[0] + ", ATK: " + up_arrs[1] +
				(t != -1 ? (", " + t + "t") : "") + ")");
		}
		return true;
	},
	// -----------------------------
	// ダメージブロック
	"ss_damageblock": function (fld, n, cobj, params) {
		var rate = params[0];
		var t = params[1];
		var calltype = params[2];
		switch(calltype){
			case "ringan":
				var typestr = "[凛眼]"
				break;
			case "SS":
			default:
				var typestr = ""
				break;
		}
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			if (now.nowhp > 0) {
				now.turn_effect.push({
					desc: "ダメージブロック" + typestr + "(" + rate + ")",
					type: "ss_damage_block" + calltype,
					icon: "damage_block",
					isdual: false,
					iscursebreak: true,
					turn: t,
					lim_turn: t,
					effect: function () { },
					priority: 1,
					on_damage: function (f, dmg, attr) {
						if (dmg >= rate) {
							return dmg;
						} else {
							return 0;
						}
					}
				});
			}
			fld.log_push("Unit[" + (i + 1) + "]: ダメージブロック(" + rate + "/" + t + "t)");
		}
		return true;
	},
	// -----------------------------
	// 味方全体に軽減
	"ss_attr_guard": function (fld, n, cobj, params) {
		var attr = params[0];
		var rate = params[1];
		var turn = params[2];
		var calltype = params[3];
		switch(calltype){
			case "AS":
				var isdual = true;
				var isreduce_stg = true;
				var nolog = true;
				var typestr = "[AS]"
				break;
			case "RF":
				var isreinforce = true;
				var typestr = "[精霊強化]"
				break;
			case "aseffect": 
				// 乗算処理
				var is_multiple = true;
				var isreduce_stg = true;
				var typestr = "[AS変化]"
				break;
			case "SS":
			default:
				var typestr = ""
				break;
		}
		var attrstr=get_attr_string(attr);		
		var cds = ss_get_targetally(fld, cobj, fld.Allys.Deck, n);
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var cd = cds[i];
			var now = nows[i];
			if (now.nowhp > 0) {
				now.turn_effect.push({
					effect: function () { },
					desc: attrstr + "軽減" + typestr + "(" + rate * 100 + "%)",
					type: "ss_attr_guard" + calltype,
					icon: "attr_guard",
					isguard: true,
					isdual,
					is_multiple,
					isreduce_stg,
					iscursebreak: true,
					turn: turn,
					lim_turn: turn,
					attr: attr,
					rate: rate*100,
					isreinforce: isreinforce,
				});
			}
			if (!nolog) {
				fld.log_push("Unit[" + (i + 1) + "]: 軽減" + typestr + "(" + attrstr + "/ " + rate * 100 + "%/ " + turn + "t)");
			};
		}
		return true;
	},
	// -----------------------------
	// AS変化スキル
	"ss_aseffectadd": function (fld, n, cobj, params){
		var turn = params[0];
		var doobj = params[1];
		
		var onMissOrIgnoreAnswer = (f, oi, doobj, is_nocollect) => {
			var targs = Object.keys(doobj).filter(e => e === "no-excellent" || (is_nocollect && e === "no-collect"));
			targs.forEach(e => {
				ss_object_done(f, oi, doobj[e]);
			});
		}
		
		// 継続効果追加
		ss_continue_effect_add(fld, {
			type: "aseffect",
			turn: turn,
			lim_turn: turn,
			doObject: doobj,
			effect: function(f, oi, ceff, is_ssfin){
				fld.log_push(`Unit[${n+1}]: AS変化: 残り${ceff.lim_turn}T`);
			},
			effectOnAnswer: (f, oi, ceff) => {
				var ignoreAnswer = f.Status.ignoreAnswerSkill;	
				if(ignoreAnswer){
					// AS逃し
					onMissOrIgnoreAnswer(f, oi, ceff.doObject, false);
				} else {
					// 正答
					var time = Number($("#answer_time_sel").val());
					var sel_sec = (4 - time);
					Object.keys(ceff.doObject)
						.filter(e => {
							var n = Number(e);
							return n > 0 && sel_sec < n;
						})
						.map(e => ceff.doObject[e])
						.forEach(e => ss_object_done(f, oi, e))
					
					console.log(f, time, sel_sec);
				}
			},
			effectOnMissAnswer: (f, oi, ceff) => {
				// 誤答
				onMissOrIgnoreAnswer(f, oi, ceff.doObject, true);
			},
		});
		fld.log_push(`Unit[${n+1}]: AS変化付与`);
		
		return true;
	},
	
	// -----------------------------
	// 全体状態異常無効
	"ss_absattack_disable": function (fld, n, cobj, params) {
		var turn = params[0];
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			if (now.nowhp <= 0) { continue; }
			now.turn_effect.push({
				desc: "状態異常無効",
				type: "ss_absattack_disable",
				icon: "absattack_disable",
				isdual: false,
				iscursebreak: true,
				turn: turn,
				lim_turn: turn,
				effect: function () { },
				bef_absattack: function (f, oi, ei) {
					return false;
				}
			});
		}
		return true;
	},
	// -----------------------------
	// 鉄壁効果付与
	"ss_impregnable": function (fld, n, cobj, params) {
		var turn = params[0];
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			if (now.nowhp <= 0) { continue; }
			now.turn_effect.push({
				desc: "鉄壁・極",
				type: "ss_impregnable",
				icon: "impregnable",
				isdual: false,
				iscursebreak: true,
				turn: turn,
				lim_turn: turn,
				effect: function () { },
				bef_absattack: function (f, oi, ei) {
					return false;
				},
				bef_answer: function (f, as) {
					return false;
				},
				bef_skillcounter: function (f, ai) {
					return false;
				},
				on_damage: function (f, dmg, attr) {
					return 0;
				},
				ss_disabled: true,
			});
			fld.log_push("Unit[" + (i + 1) + "]: 鉄壁・極(" + turn + "t)");
		}
		return true;
	},
	// -----------------------------
	// ダブルスキル効果付与
	"ss_doubleskill": function (fld, n, cobj, params) {
		var turn = params[0];
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			if (now.nowhp <= 0) { continue; }
			now.turn_effect.push({
				desc: "SPスキル使用回数+1",
				type: "ss_doubleskill",
				icon: "doubleskill",
				isdual: false,
				iscursebreak: true,
				turn: turn,
				lim_turn: turn,
				effect: function () { },
			});
			fld.log_push(`Unit[${(i+1)}]: ダブルスキル効果付与(" + ${turn} + "t)`);
		}
		return true;
	},
	// -----------------------------
	// スキルブースト
	"ss_skillboost": function (fld, n, cobj, params) {
		var f_rate = params[0];
		var rst = false;
		var cds = ss_get_targetally(fld, cobj, fld.Allys.Deck, n);
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var cd = cds[i];
			var now = nows[i];
			var n_index = fld.Allys.Now.indexOf(now);
			// 自分にスキブをかけない
			if (n_index == n) { continue; }
			// スキブ処理
			if (now.nowhp <= 0) { continue; }
			if (!now.ss_isboost && !is_legendmode(fld, cd, now)) {
				addQuizCorrectNum(fld, i, f_rate);
				now.ss_current += f_rate;
				now.ss_isboost = true;
				// L化確認
				legend_timing_check(fld, fld.Allys.Deck, fld.Allys.Now, n_index);
				rst = true;
			}
		}
		return rst;
	},
	// -----------------------------
	// チェイン直接追加
	"ss_addchain": function (fld, n, cobj, params) {
		var ch = params[0];
		fld.Status.chain += ch;
		fld.log_push("チェインプラス(+" + ch + ")");
		return true;
	},
	// -----------------------------
	// チェイン保護
	"ss_chain_protect": function (fld, n, cobj, params) {
		var t = params[0];
		fld.Status.chain_status = 1;
		fld.Status.chainstat_turn = t;
		fld.log_push("Enemy[" + (n + 1) + "]: チェイン保護(" + t + "t)");
		return true;
	},
	// -----------------------------
	// 回復
	"ss_heal": function (fld, n, cobj, params) {
		var rate = params[0];
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			var hr = Math.floor(now.maxhp * rate);
			heal_ally(fld, hr, fld.Allys.Now.indexOf(now));
			fld.log_push("Unit[" + (i + 1) + "]: HP回復(" + (rate * 100) + "%)");
		}
		return true;
	},
	// -----------------------------
	// 副属性考慮回復
	"ss_heal_subattr": function (fld, n, cobj, params) {
		var m_attr = params[0];
		var m_rate = params[1];
		var s_attr = params[2];
		var s_rate = params[3];
		var cards = ss_get_targetally(fld, cobj, fld.Allys.Deck, n);
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			var card = cards[i];
			var n_index = fld.Allys.Now.indexOf(now);
			if(m_attr[card.attr[0]] > 0){
				var hr = Math.floor(now.maxhp * rate);
				var rate = m_rate;
				if(s_attr[card.attr[1]] > 0){
					rate = s_rate;
				}
				var hr = Math.floor(now.maxhp * rate);
				heal_ally(fld, hr, n_index);
				fld.log_push("Unit[" + (i + 1) + "]: HP回復(" + (rate * 100) + "%)");
			}
		}
		return true;
	},
	// -----------------------------
	// 指定値だけ全体回復(1000回復, etc)
	"ss_heal_absolute": function (fld, n, cobj, params) {
		var rate = params[0];
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			heal_ally(fld, rate, fld.Allys.Now.indexOf(now));
		}
		fld.log_push("Unit[" + (i + 1) + "]: HP回復(+" + rate + ")");
		return true;
	},
	// -----------------------------
	// 状態異常回復
	"ss_abstate_cure": function (fld, n, cobj, params) {
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			for (var te = 0; te < now.turn_effect.length; te++) {
				if (now.turn_effect[te].isabstate) {
					now.turn_effect.splice(te, 1);
					te--;
				}
			}
		}
		fld.log_push("Unit[" +(i +1) + "]: 異常回復");
		return true;
	},
	// -----------------------------
	// リジェネ付与
	"ss_regenerate": function (fld, n, cobj, params) {
		var rate = params[0];
		var t = params[1];
		var calltype = params[2];
		switch(calltype){
			case "RF":
				var isreinforce = true
				var isreduce_stg = true;
				var typestr = "[精霊強化]"
				var rate_awplusRF = pickup_awakes(fld, fld.Allys.Deck[n], "awake_rateup_regenerateRF", false);
				$.each(rate_awplusRF, function(i, e){
					rate += e.upvalue / 100;
				});
				rate = Math.floor(rate * 100) / 100;
				break;
			case "SS":
			default:
				var typestr = ""
				break;
		}
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			now.turn_effect.push({
				desc: "HPを徐々に回復" + typestr + "(" + (rate * 100) + "%)",
				type: "ss_regenerate" + calltype,
				icon: "regenerate",
				isdual: false,
				iscursebreak: true,
				priority: 1,
				turn: t,
				lim_turn: t,
				effect: function (f, oi, teff, state, is_t) {
					if (is_t) {
						var nd = f.Allys.Now[oi];
						var hr = Math.floor(nd.maxhp * rate);
						heal_ally(f, hr, oi);
						fld.log_push("Unit[" + (oi + 1) + "]: HP徐々に回復" + typestr + "(+" + hr + ")");
					}
				},
			});
		}
		return true;
	},
	// -----------------------------
	// 起死回生
	"ss_revival": function (fld, n, cobj, params) {
		var rate = params[0];
		var t = params[1];
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var now = nows[i];
			if (now.nowhp <= 0) { continue; }
			now.turn_effect.push({
				desc: "起死回生",
				type: "ss_revival",
				icon: "revival",
				isdual: false,
				iscursebreak: true,
				turn: t,
				lim_turn: t,
				effect: function () { },
				before_dead: function (f, oi) {
					var now = f.Allys.Now[oi];
					now.nowhp = Math.floor(now.maxhp * rate);
					f.log_push("Unit[" + (oi + 1) + "]: 起死回生発動");
				}
			});
		}
		return true;
	},
	// -----------------------------
	// 蘇生
	"ss_resurrection": function (fld, n, cobj, params) {
		var attr = params[0];
		var rate = params[1];
		var cds = ss_get_targetally(fld, cobj, fld.Allys.Deck, n);
		var nows = ss_get_targetally(fld, cobj, fld.Allys.Now, n);
		for (var i = 0; i < nows.length; i++) {
			var cd = cds[i];
			var now = nows[i];
			if (now.nowhp <= 0 && attr[cd.attr[0]]) {
				now.nowhp = Math.min((now.maxhp * rate), now.maxhp);
				now.nowhp = Math.floor(now.nowhp);
				// 復活時にLなら死亡時解除の潜在を再適用
				if(is_legendmode(fld, fld.Allys.Deck[n], fld.Allys.Now[n])){
					add_awake_ally(fld, fld.Allys.Deck, fld.Allys.Now, i, true);
				}
			}
		}
		fld.log_push("Unit[" + (i + 1) + "]: 蘇生(" + (rate * 100) + "%)");
		return true;
	},
	// -----------------------------
	// パネル変換
	"ss_panel_change": function (fld, n, cobj, params) {
		var p_attr = params[0];
		fld.Status.panel_color = new Array(4).fill(p_attr);
		fld.log_push(`Unit[${(n + 1)}]: パネル変換(${get_attr_string(p_attr, "/")})`);
		return true;
	},
	// -----------------------------
	// パネルリザーブ
	"ss_panel_reserve": function (fld, n, cobj, params) {
		var attr = params[0];
		var turn = params[1];
		var added_effects = params[2];
		
		var updatePanel = (fld) => {
			// 変換処理
			fld.Status.panel_color = new Array(4).fill(attr);
			// パネル効果上書き
			fld.Status.panel_add = [];
			added_effects.forEach(e => {
				ss_object_done(fld, -1, e);
			})
			fld.log_push(`Unit[${(n + 1)}]: パネルリザーブ(${get_attr_string(attr, "/")})`);
		}
		// 最初に一回
		updatePanel(fld);
		
		// 付与
		ss_continue_effect_add(fld, {
			type: "panel_reserve_by_ally",
			isdemerit: false,       // 確かfalseだったような？要確認
			turn: turn,
			lim_turn: turn,
			priority: -100,
			effect: function(f, oi, ceff){
				// 変換
				updatePanel(f);
			},
			// 出現時処理
			effectOnAppear: function(f, oi, ceff){
				// 変換
				updatePanel(f);
			},
		});
		return true;
	},
	// -----------------------------
	// パネル付与効果(複合用)
	"panel_multieffect": function (fld, n, cobj, params) {
		var effs_dat = params[0][0];
		var effects = $.map(effs_dat, (e) => {
			for(var i=1; ; i++){
				// 引数の最後に複数パネル用の引数を(無理やり)追加
				if(!e[`p${i}`]){
					e[`p${i}`] = true;
					break;
				}
			}
			return ss_object_done(fld, n, e, true);
		});
		// 複数パネルの効果をまとめる
		var desc = $.map(effects, (e) => e.desc).join("/");
		var func = (fl) => {
			// 個別パネルの実行
			var fcs = $.map(effects, (e) => e.func);
			$.each(fcs, (i,e) => e(fl));
			return true;
		}
		// 追加
		return panel_addition(fld, desc, func, false);
	},
	// -----------------------------
	// 攻撃力アップパネル付与効果
	"panel_attackup": function (fld, n, cobj, params) {
		var p = params[0];
		var is_multi = params[1];
		var dsc = "攻撃力アップ(" + (p * 100) + "%)";
		return panel_addition(fld, dsc, function(fl){
			for (var i = 0; i < fl.Allys.Deck.length; i++) {
				var now = fl.Allys.Now[i];
				now.as_enhance = (now.as_enhance ? now.as_enhance : 0) + p;
			}
			fld.log_push("パネル付与効果発動: " + dsc);
		}, is_multi);
	},
	// -----------------------------
	// チェインプラスパネル付与効果
	"panel_chainplus": function (fld, n, cobj, params) {
		var p = params[0];
		var is_multi = params[1];
		var dsc = "チェインプラス(+" + p + ")";
		return panel_addition(fld, dsc, function(fl){
			if (fl.Status.chain_status >= 0) {
				fl.Status.chain += p;
				fl.log_push("パネル付与効果発動: " + dsc);
			}
		}, is_multi);
	},
	// -----------------------------
	// 回復パネル付与効果
	"panel_healally": function (fld, n, cobj, params) {
		var r = params[0];
		var is_multi = params[1];
		var dsc = "味方回復(" + (r * 100) + "%)";
		return panel_addition(fld, dsc, function(fl){
			for (var i = 0; i < fl.Allys.Deck.length; i++) {
				var now = fl.Allys.Now[i];
				heal_ally(fl, Math.floor(now.maxhp * r), i);
			}
			fl.log_push("パネル付与効果発動: " + dsc);
		}, is_multi);
	},
	// -----------------------------
	// スキルブーストパネル付与効果
	"panel_skillboost": function (fld, n, cobj, params) {
		var t = params[0];
		var is_multi = params[1];
		var dsc = "スキルブースト(+" + t + ")";
		return panel_addition(fld, dsc, function(fl){
			for (var i = 0; i < fl.Allys.Deck.length; i++) {
				// スキブ処理
				var card = fl.Allys.Deck[i];
				var now = fl.Allys.Now[i];
				if (now.nowhp <= 0) {
					continue;
				}
				if (!now.ss_isboost && !is_legendmode(fl, card, now)) {
					addQuizCorrectNum(fl, i, t);
					now.ss_current += t;
					now.ss_isboost = true;
					// L化確認
					legend_timing_check(fl, fl.Allys.Deck, fl.Allys.Now, i);
				}
			}
			fl.log_push("パネル付与効果発動: " + dsc);
		}, is_multi);
	},
	// -----------------------------
	// パネルに軽減効果を付与する
	"panel_attr_guard": function (fld, n, cobj, params) {
		var attr = params[0];
		var rate = params[1];
		var is_multi = params[2];
		var dsc = "パネル軽減効果(" + (rate * 100) + "%)";
		return panel_addition(fld, dsc, function(fl){
			fl.Status.panel_guard = {
				attr: attr,
				rate: rate,
			}
			fl.log_push("パネル付与効果発動: " + dsc);
		}, is_multi);
	},
	// -----------------------------
	// パネルに自傷効果を付与する
	"panel_consume_add": function (fld, n, cobj, params) {
		var rate = params[0];
		var is_multi = params[1];
		var dsc = `パネル効果(自傷${(rate * 100)}%)`;
		return panel_addition(fld, dsc, function(fl){
			ss_object_done(fld, 0, ss_consume_all(rate));
			fl.log_push("パネル付与効果発動: " + dsc);
		}, is_multi);
	},
	// -----------------------------
	// スキル反射無視
	"ss_ignore_skillcounter": function (fld, n, cobj, params) {
		var enemys = GetNowBattleEnemys(fld);
		$.each(enemys, function (i, e) {
			if (e.flags) {
				e.flags.is_ss_attack = false;
			}
		});
		return true;
	},
	// -----------------------------
	// カウンター解除
	"ss_break_attackcounter": function (fld, n, cobj, params) {
		return ss_break_template(cobj.target, "attack_counter")(fld, n);
	},
	// スキル反射解除
	"ss_break_skillcounter": function (fld, n, cobj, params) {
		return ss_break_template(cobj.target, "skill_counter")(fld, n);
	},
	// ガード解除
	"ss_break_attrguard": function (fld, n, cobj, params) {
		return ss_break_template(cobj.target, "attr_guard")(fld, n);
	},
	// ダメブロ解除
	"ss_break_dblock": function (fld, n, cobj, params) {
		return ss_break_template(cobj.target, "damage_block")(fld, n);
	},
	// 属性吸収解除
	"ss_break_absorb": function (fld, n, cobj, params) {
		return ss_break_template(cobj.target, "attr_absorb")(fld, n);
	},
	// -----------------------------
	// 解答時間延長/停止
	"ss_astime_ext": function (fld, n, cobj, params) {
		var longtime = params[0];
		if(longtime >= 20){
			// 1秒未満にセット
			$("#answer_time_sel").val(4);
			fld.log_push(`Unit[${(n + 1)}]: 解答時間停止`);
		}
		return true;
	},
	// -----------------------------
	// 決闘
	"ss_duelmode": function (fld, n, cobj, params) {
		// おい、デュエルしろよ
		var t = params[0];
		var guard_rate = params[1];
		var guard_attr = params[2];
		// 対象の敵1体を取得
		var en = ss_get_targetenemy(fld, cobj, n, undefined)[0];
		var enemy_index = GetNowBattleEnemys(fld).indexOf(en);
		// 決闘効果を付与
		en.turn_effect.push({
			desc: `決闘(to:Unit${n+1})`,
			type: "duel",
			icon: "duel",
			isdual: false,
			turn: t,
			lim_turn: t,
			targetUnit: n,
			ignoreStatusResetCount: true,
			effect: function (f, ei, teff, state, is_t, is_b, is_ss) {
				// 発動した味方が死んでいるなら、効果を解除する
				var now_ = f.Allys.Now[n];
				if(now_.nowhp <= 0){
					teff.lim_turn = 0;
				}
			},
		});

		// 自身にも決闘効果を付与
		var now = fld.Allys.Now[n];
		now.turn_effect.push({
			desc: `決闘(to:Enemy${enemy_index+1})`,
			type: "duel",
			icon: "duel",
			isdual: false,
			iscursebreak: false,
			turn: t,
			lim_turn: t,
			targetUnit: n,
			effectAlways: true,
			effect: function (f, ei, teff, state, is_t, is_b, is_ss) {
				// 発動した敵が死んでいるなら、効果を解除する
				var mv = en.move;
				if(en.nowhp <= 0 && (!mv || (mv.on_dead && en.on_dead_execed))){
					teff.lim_turn = 0;
				}
			},
		});
		// 味方全体に軽減効果も付与
		if(guard_rate > 0){
			var attrstr = get_attr_string(guard_attr, "/");
			var nows = fld.Allys.Now;
			for (var i = 0; i < nows.length; i++) {
				var now = nows[i];
				if (now.nowhp > 0) {
					now.turn_effect.push({
						effect: function(){ },
						desc: attrstr + "軽減[決闘](" + guard_rate * 100 + "%)",
						type: "ss_attr_guard_duel",
						icon: "attr_guard",
						isguard: true,
						iscursebreak: false,    // 呪い解除されない
						turn: t,
						lim_turn: t,
						attr: guard_attr,
						rate: guard_rate * 100,
						isreinforce: false,
					});
				}
			}
		}
		
		fld.log_push(`Unit[${(n + 1)}]: 決闘付与(to: Enemy[${enemy_index+1}])`);
		return true;
	},
	// -----------------------------
	// SSコピー
	"ss_latest_copy": function (fld, n, cobj, params) {
		if (fld.Status.latest_ss) {
			var last_now = fld.Status.latest_now;
			var now = fld.Allys.Now[n];
			now.intensely_val = last_now.intensely_val - 1;
			return ss_procdo(fld, fld.Status.latest_ss, now, n, true);
		} else {
			return false;
		}
	},

	// -----------------------------
	// デメリット系: 自分に割合ダメージ
	"ss_consume_own": function (fld, n, cobj, params) {
		var p = params[0];
		var now = fld.Allys.Now[n];
		var dmg = Math.floor(p * now.maxhp);
		fld.log_push("Unit[" + (n + 1) + "]: 自傷(" + (p * 100) + "%)");
		damage_ally(fld, dmg, n);
		return true;
	},
	// -----------------------------
	// デメリット系: 味方全体に割合ダメージ
	"ss_consume_all": function (fld, n, cobj, params) {
		var p = params[0];
		var ct = 0;
		fld.log_push("全体自傷(" + (p * 100) + "%)");
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			var dmg = Math.floor(p * now.maxhp);
			if (now.nowhp > 0) {
				damage_ally(fld, dmg, i);
				ct++;
			}
		}
		return ct;
	},
	// -----------------------------
	// デメリット系: 味方全体に切り上げの割合ダメージ
	"ss_consumeCeil_all": function (fld, n, cobj, params) {
		var p = params[0];
		var ct = 0;
		fld.log_push("全体自傷[切り上げ](" + (p * 100) + "%)");
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			var dmg = Math.ceil(p * now.maxhp);
			if (now.nowhp > 0) {
				damage_ally(fld, dmg, i);
				ct++;
			}
		}
		return ct;
	},
	// -----------------------------
	// デメリット系: 自身を封印状態にする
	"ss_allsealed_own": function (fld, n, cobj, params) {
		var t = params[0];
		// 封印攻撃を呼ぶ
		s_enemy_abstate_attack(
			fld, "封印", "all_sealed", t, [n], -1, true, {
				bef_answer: function (f, as) {
					return false;
				},
				bef_skillcounter: function (f, ai) {
					return false;
				},
				ss_disabled: true,
			}
		);
		return true;
	},
	// -----------------------------
	// (バーニング用)SPスキル使用可能化
	"spskill_maxcharge": function (fld, n, cobj, params) {
		nows = fld.Allys.Now;
		$.each(nows, function (i, e) {
			// addQuizCorrectNum(fld, i, 999); // ここでは追加しない
			e.ss_current = 999;
			// スキブ処理
			var card = fld.Allys.Deck[i];
			legend_timing_check(fld, fld.Allys.Deck, nows, i, true);
		})
		return true;
	},
	"spskill_maxcharge_spec": function (fld, n, cobj, params) {
		nows = fld.Allys.Now;
		var spe = params[0]-1;
		$.each(nows, function (i, e) {
			if(fld.Allys.Deck[i].species.indexOf(spe)!=-1){
				// addQuizCorrectNum(fld, i, 999); // ここでは追加しない
				e.ss_current = 999;
				// スキブ処理
				var card = fld.Allys.Deck[i];
				legend_timing_check(fld, fld.Allys.Deck, nows, i, true);
			}
		})
		return true;
	},
	// -----------------------------
	// 未定義スキル
	"ss_warning": function (fld, n, cobj, params) {
		var str = params[0];
		fld.log_push(`Unit[${n+1}]: [WARNING] ${str}`, "orange");
	},
	"ss_undefined": function (fld, n, cobj, params) {
		var str = params[0];
		var text = params[1];
		fld.log_push(`Unit[${n+1}]: [UNDEFINED] ${str}`, "orange");
		throw `\n[${str}: ${text || "スキルが定義されていない精霊です。実装をお待ちください。"}]`;
	},
	/*
	// -----------------------------
	// テンプレート
	"ss_template": function (fld, n, cobj, params) {
		var xxx1 = params[0];
		var xxx2 = params[1];
		var xxx3 = params[2];
		var xxx4 = params[3];

		return true;
	},
	*/
}

// ------------------------------------
// SS条件関数定義リスト
var SpCondSkill = {
	// -----------------------------
	// HP条件(一定以上)
	"ss_hp_more": function (fld, oi, cobj, params) {
		var cond = params[0];
		var a = params[1];
		var b = params[2];
		var now = fld.Allys.Now[oi];
		return (now.nowhp >= (now.maxhp * cond)) ? a : b;
	},
	"ss_hp_more_skill": function (fld, oi, cobj, params) {
		var scc_rst = this["ss_hp_more"](fld, oi, cobj, params);
		if (scc_rst) {
			return ss_object_done(fld, oi, scc_rst, true);
		}
		return null;
	},
	// -----------------------------
	// HP条件(一定以下)
	"ss_hp_less": function (fld, oi, cobj, params) {
		var cond = params[0];
		var a = params[1];
		var b = params[2];
		var now = fld.Allys.Now[oi];
		return (now.nowhp <= (now.maxhp * cond)) ? a : b;
	},
	"ss_hp_less_skill": function (fld, oi, cobj, params) {
		var scc_rst = this["ss_hp_less"](fld, oi, cobj, params);
		if (scc_rst) {
			return ss_object_done(fld, oi, scc_rst, true);
		}
		return null;
	},
	// -----------------------------
	// HP条件(一定未満)
	"ss_hp_under": function (fld, oi, cobj, params) {
		var cond = params[0];
		var a = params[1];
		var b = params[2];
		var now = fld.Allys.Now[oi];
		return (now.nowhp < (now.maxhp * cond)) ? a : b;
	},
	// -----------------------------
	// リーダー時に効果値アップ
	"ss_when_leader": function (fld, oi, cobj, params) {
		var a = params[0];
		var b = params[1];
		return (oi == 0) ? a : b;
	},
	// -----------------------------
	// 属性特攻
	"special_attr": function (fld, oi, cobj, params) {
		var attrs = params[0];
		var a = params[1] + 1;
		var b = params[2] + 1;
		var e = GetNowBattleEnemys(fld);
		var rst = [];
		for (var i = 0; i < e.length; i++) {
			rst[i] = (attrs[e[i].attr] > 0) ? a : b;
		}
		return rst;
	},
	// -----------------------------
	// 回答時間依存
	"ss_answertime": function (fld, oi, cobj, params) {
		var a = params[0];
		var b = params[1];
		var time = Number($("#answer_time_sel").val());

		return a + b * time;
	},
	// -----------------------------
	// L精霊数依存
	"ss_legendnum": function (fld, oi, cobj, params) {
		var a = params[0];
		var b = params[1];
		var cards = fld.Allys.Deck;
		var nows = fld.Allys.Now;
		var num = 0;
		for (var i = 0; i < cards.length; i++) {
			num += (is_legendmode(fld, cards[i], nows[i]) ? 1 : 0);
		}
		return a + b * num;
	},
	// -----------------------------
	// 単属性精霊数依存
	"ss_singleattr_num": function (fld, oi, cobj, params) {
		var a = params[0];
		var b = params[1];
		var cards = fld.Allys.Deck;
		var num = 0;
		for (var i = 0; i < cards.length; i++) {
			num += (cards[i].attr[1] == -1 ? 1 : 0);
		}
		return a + b * num;
	},
	// -----------------------------
	// 激化大魔術
	"ss_intenselyval": function (fld, oi, cobj, params, add_obj) {
		var a = params[0];
		var b = params[1];
		var c = params[3];
		var max = params[2];
		var now = fld.Allys.Now[oi];
		var x = (now.intensely_val || 0);
		if(!add_obj.is_skillcopy){
			now.intensely_val = x + 1;
		}
		return Math.min(a + b * Math.pow(c,x), max);
	},
	// -----------------------------
	// 味方全体自傷して自傷した数だけ効果値を増やす
	"ss_consume_all_cond": function (fld, oi, cobj, params) {
		var base = params[0];
		var dmg = params[1];
		var sca = ss_consume_all(dmg);
		return base * ss_object_done(fld, oi, sca);
	},
	// -----------------------------
	// 味方全体を封印状態にして対象数だけ効果値を増やす
	"ss_seal_all_cond": function (fld, oi, cobj, params) {
		var base = params[0];
		var turn = params[1];
		var nows = fld.Allys.Now;
		var count = 0;
		for (var i = 0; i < nows.length; i++) {
			if (nows[i].nowhp <= 0) { continue; }
			var scs = ss_allsealed_own(turn);
			ss_object_done(fld, i, scs);
			count++;
		}
		return base * count;
	},
	// -----------------------------
	// 自身が異常状態かどうか
	"ss_is_abstate_own": function (fld, oi, cobj, params) {
		var a = params[0];
		var b = params[1];
		var now = fld.Allys.Now[oi];
		var is_abstate = $.grep(now.turn_effect, function (e) {
			return e.isabstate || e.type == "curse";
		}).length > 0;
		return is_abstate ? a : b;
	},
	// -----------------------------
	// 自身がAS封印状態かどうか
	"ss_is_assealed_own_skill": function (fld, oi, cobj, params) {
		var ss1 = params[0];
		var ss2 = params[1];
		var now = fld.Allys.Now[oi];
		var is_asseal = $.grep(now.turn_effect, function (e) {
			return e.type == "as_sealed";
		}).length > 0;
		return is_asseal ? ss1 : ss2;
	},
	// -----------------------------
	// 自身が毒かどうか
	"ss_is_poison_own": function (fld, oi, cobj, params) {
		var a = params[0];
		var b = params[1];
		var now = fld.Allys.Now[oi];
		var is_poison = $.grep(now.turn_effect, function (e) {
			return e.type == "poison";
		}).length > 0;
		if (is_poison) {
			return a;
		}
		return b;
	},
	"ss_is_poison_own_skill": function (fld, oi, cobj, params) {
		var scp_rst = this["ss_is_poison_own"](fld, oi, cobj, params);
		if (scp_rst) {
			return ss_object_done(fld, oi, cobj.p1, true);
		}
	},
	// -----------------------------
	// 自身が呪いかどうか
	"ss_is_cursed_own": function (fld, oi, cobj, params) {
		var a = params[0];
		var b = params[1];
		var now = fld.Allys.Now[oi];
		var is_cursed = $.grep(now.turn_effect, function (e) {
				return e.type == "curse";
			}).length > 0;
		if (is_cursed) {
			return a;
		}
		return b;
	},
	"ss_is_cursed_own_skill": function (fld, oi, cobj, params) {
		var scc_rst = this["ss_is_cursed_own"](fld, oi, cobj, params);
		if (scc_rst) {
			return ss_object_done(fld, oi, cobj.p1, true);
		}
	},
	// -----------------------------
	// 相手が毒かどうか
	"ss_is_poison_enemy": function (fld, oi, cobj, params) {
		var a = params[0];
		var b = params[1];
		var rst = [];
		var es = GetNowBattleEnemys(fld);
		for (var i = 0; i < es.length; i++) {
			var is_poison = $.grep(edat.turn_effect, function (e) {
				return e.type == "poison";
			}).length > 0;
			rst[i] = is_poison ? a : b;
		}
		return rst;
	},
	// -----------------------------
	// 純属性精霊数に応じて効果値変動
	"ss_pureattr_cond": function (fld, oi, cobj, params) {
		const rate_fix = [0, 0.1, 0.15, 0.25, 0.35, 1];
		// 使用者の主属性を見て、対象属性を指定(指定漏れ対策)
		var cards = fld.Allys.Deck;
		var user_c = cards[oi];
		var user_m_attr = user_c.def_attr ? user_c.def_attr[0] : user_c.attr[0];
		var rate = params[0];
		var attr = (params[1] >= 0 ? params[1] : user_m_attr);
		var count = 0;
		for(var i=0; i < cards.length; i++){
			var c = cards[i];
			var now = fld.Allys.Now[i];
			if(now.nowhp > 0 && c.attr[0] == attr && c.attr[1] == -1){
				count++;
			}
		}
		count = Math.max(Math.min(count, 5), 0);
		return Number((rate * rate_fix[count]).toFixed(3));
	},
	// -----------------------------
	// デッキの属性(副属性込み)数に応じて効果値変動
	"ss_multiattr_cond": function (fld, oi, cobj, params) {
		const rate_fix = [0, 0.1, 0.15, 0.25, 0.35, 1];
		var rate = params[0];
		var cards = fld.Allys.Deck;
		var attrs = [0, 0, 0, 0, 0];
		var count = 0;
		for(var i=0; i < cards.length; i++){
			var c = cards[i];
			var now = fld.Allys.Now[i];
			if(now.nowhp > 0){
				$.each(c.attr, (i,e) => {
					if(e >= 0){
						attrs[e]++;
					}
				})
			}
		}
		count = $.map(attrs, (e) => {
			return (e > 0 ? 1 : null);
		}).length;
		return Number((rate * rate_fix[count]).toFixed(3));
	},
	// -----------------------------
	// 主属性+複属性の一致する数に応じて効果値変動
	"ss_matchattr_cond": function (fld, oi, cobj, params) {
		const rate_fix = [0, 0.1, 0.15, 0.25, 0.35, 1];
		// 使用者の主属性を見て、対象属性を指定(指定漏れ対策)
		var cards = fld.Allys.Deck;
		var user_c = cards[oi];
		var rate = params[0];
		var target_m_attr = params[1];
		var target_s_attr = params[2];
		var count = 0;
		for(var i=0; i < cards.length; i++){
			var c = cards[i];
			var m_attr = c.def_attr ? c.def_attr[0] : c.attr[0];
			var s_attr = c.def_attr ? c.def_attr[1] : c.attr[1];
			var now = fld.Allys.Now[i];
			if(now.nowhp > 0
				&& target_m_attr[m_attr] > 0
				&& target_s_attr[s_attr] > 0 ){
				count++;
			}
		}
		count = Math.max(Math.min(count, 5), 0);
		return Number((rate * rate_fix[count]).toFixed(3));
	},
	// -----------------------------
	// チェイン分岐
	"ss_chain_cond": function (fld, oi, cobj, params) {
		var ch = params[0];
		var a = params[1];
		var b = params[2];
		return (fld.Status.chain >= ch) ? a : b;
	},
	"ss_chain_cond_skill": function (fld, oi, cobj, params) {
		var scc_rst = this["ss_chain_cond"](fld, oi, cobj, params);
		return ss_object_done(fld, oi, scc_rst, true);
	},
	// -----------------------------
	// チェイン消費
	"ss_chain_cost": function (fld, oi, cobj, params) {
		var ch = params[0];
		var a = params[1];
		var b = params[2];
		if (fld.Status.chain >= ch) {
			fld.Status.chain -= ch;
			fld.log_push("チェイン消費: " + ch);
			return a;
		}
		return b;
	},
	"ss_chain_cost_skill": function (fld, oi, cobj, params) {
		var scc_rst = this["ss_chain_cost"](fld, oi, cobj, params);
		return ss_object_done(fld, oi, scc_rst, true);
	},
	

	/*
	// -----------------------------
	// テンプレート
	"ss_template": function (fld, oi, cobj, params) {
		var xxx1 = params[0];
		var xxx2 = params[1];
		var xxx3 = params[2];
		var xxx4 = params[3];

		return true;
	},
	*/
}

// (凛眼: 互換維持用)
SpSkill["ss_damageblock_all"] = SpSkill["ss_damageblock"];


// ------------------------------------
// 自身の隣接指定に変更する用の関数
function ss_toselect_ownside(skill) {
	skill.target = "own_side";
	return skill;
}

// 味方単体指定に変更する用の関数
// ::使用方法 ss_toselect_one(ss_heal(1))
function ss_toselect_one(skill) {
	skill.target = "ally_one";
	return skill;
}

// 敵全体対象SSを敵単体指定に変更する用の関数
// ::使用方法 ss_toselect_one(ss_heal(1))
function ss_toselect_single(skill) {
	skill.target = "single";
	return skill;
}

// ------------------------------------
// (内部用)実行関数
function ss_object_done(fld, n, c_obj, option) {
	option = option === true ? {is_check_crs: true} : (option || null);
	var is_check_crs = option ? option.is_check_crs : false;
	var add_obj = {};
	add_obj.is_skillcopy = option ? option.is_skillcopy : false;
	
	// nullとかが渡されたら何もしない
	if(!c_obj){
		return;
	}
	// type switch
	var skl_list = c_obj.is_skill ? SpSkill: SpCondSkill;
	// 未定義なら実行しない
	if (!skl_list || !skl_list[c_obj.name]) {
		return null;
	}
	// 引数チェック
	var params = [];
	var count = 0;
	while (c_obj["p" + (count + 1)] != null) {
		var px = "p" + (count + 1);
		var p = c_obj[px];
		// 遅延評価関数なら特に何もしない
		if(c_obj.is_delay || (c_obj.delaychkparam && c_obj.delaychkparam.indexOf(px) >= 0)){
			params[count] = p;
		}
		// 条件またはスキルなら再帰
		else if (p.is_cond || p.is_skill) {
			params[count] = ss_object_done(fld, n, p, option);
		}
		// 関数なら実行
		else if ($.isFunction(p)) {
			params[count] = p();
		}
		// 配列なら内部要素について再帰
		else if ($.isArray(p)) {
			params[count] = [];
			for (i = 0; i < p.length; i++) {
				var is_num = $.isNumeric(p[i]);
				var isdelay = (c_obj.delaychkparam && c_obj.delaychkparam.indexOf(px) >= 0);
				params[count][i] = (is_num && !isdelay) ? p[i] : ss_object_done(fld, n, p[i], option);
			}
		}
		// 関数型でないならそのまま
		else {
			params[count] = p;
		}
		count++;
	}
	// 潜在結晶チェック状態なら
	if (is_check_crs && c_obj.c_param) {
		// 潜在結晶効果値アップ系の処理を行う
		for (var pn in c_obj.c_param) {
			var pm = c_obj.c_param[pn];
			var card = fld.Allys.Deck[n];
			var tg = pm.target.length >= 2 ? pm.target : [pm.target];
			for (var i = 0; i < tg.length; i++) {
				$.each(pickup_awakes(fld, card, pn, false), function (j, e) {
					var r_max = Number.MAX_VALUE;
					if ($.isArray(params[tg[i]])) {
						for (var k = 0; k < params[tg[i]].length; k++) {
							params[tg[i]][k] += Math.min(e.upvalue || e.up, pm.rate_max || r_max) * (pm.rate_mlt || 1);
						}
					} else {
						params[tg[i]] += Math.min(e.upvalue || e.up, pm.rate_max || r_max) * (pm.rate_mlt || 1);
					}
				})
			}
		}
	}
	// 関数実行
	return skl_list[c_obj.name](fld, n, c_obj, params, add_obj);
}

// (内部用)敵にSSダメージ
function ss_damage(fld, r, atr, atkn, own, tg, isnot_ss, option) {
	var enemy = GetNowBattleEnemys(fld, tg);
	var card = fld.Allys.Deck[own];
	var now = fld.Allys.Now[own];
	var rnd = damage_rand(fld);
	// 威力が配列で渡されたら取り出す
	var rate = $.isArray(r) ? r[tg] : r;
	// 攻撃
	fld.Status.turn_dmg += attack_enemy(
		fld, enemy, now, atr, rate, atkn, [atr], fld.Status.chain, rnd, own, tg, true, 0, undefined, option);
	// SSフラグを立てる
	enemy.flags.is_ss_attack = (isnot_ss != true);
}

// (内部用)パネル付与効果
function panel_addition(fld, dsc, fc, is_multi) {
	var panel_obj = {
		desc: dsc,
		func: fc,
	}
	// 複合パネル付与なら、ここでは処理せずobjectだけ返す
	if(is_multi){
		return panel_obj;
	}
	// それ以外ならここで追加処理
	fld.Status.panel_add.push(panel_obj);
	return true;
}

// (内部用)敵スキル解除系テンプレ
function ss_break_template(target, type) {
	var _break_temp_fc = function (fld, oi, ei) {
		var is_break = false;
		var em = GetNowBattleEnemys(fld, ei);
		for (var i = 0; i < em.turn_effect.length; i++) {
			var eff = em.turn_effect[i];
			// typeを含んでいる場合除く
			// (attack_counterが指定されてたら多段カウンターも除く)
			if (eff.type.indexOf(type) >= 0) {
				turneff_remove_pos(fld, em.turn_effect, i);
				i--;
				is_break = true;
			}
		}
		return is_break;
	};
	return function (fld, n) {
		var cd = fld.Allys.Deck[n];
		var es = GetNowBattleEnemys(fld);
		var rsts = false;
		if (target == "all") {
			for (var i = 0; i < es.length; i++) {
				var rst = _break_temp_fc(fld, n, i);
				es[i].flags.is_ss_attack = rst;
				rsts = rsts || rst;
			}
		} else {
			var tg = auto_attack_order(fld, es, cd.attr[0], n);
			var rst = _break_temp_fc(fld, n, tg);
			es[tg].flags.is_ss_attack = rst;
			rsts = rsts || rst;
		}
		return rsts;
	}
}

// (内部用)[対象:敵]効果対象が単体か全体かを判別して適切な敵配列を返却
function ss_get_targetenemy(fld, ss, ai, attr) {
	// 敵3体の時の並び順
	var earr3 = [0,1,2];
	// 敵5体の時の並び順
	 var earr5 = [0,3,1,4,2];
	 // 属性指定
	 attr = (attr != undefined ? attr : fld.Allys.Deck[ai].attr[0]);
	// タゲの種類で分岐
	switch (ss.target) {
		case "all":
			return GetNowBattleEnemys(fld);
		case "single":
			var enemys = GetNowBattleEnemys(fld);
			var tg = auto_attack_order(fld, enemys, attr, ai);
			return [enemys[tg]];
		case "withside":
			var enemys = GetNowBattleEnemys(fld);
			var tg = auto_attack_order(fld, enemys, attr, ai);
			var e_order = (enemys.length >= 4 ? earr5 : earr3);
			// まず始めに両脇の敵を追加する
			var new_arr = $.map(enemys, function(e, i){
				if((tg > 0 && e_order[e_order.indexOf(tg)-1] == i)               // タゲ対象の左側を含める
				|| (tg < enemys.length && e_order[e_order.indexOf(tg)+1] == i)   // タゲ対象の右側を含める
				){
					return enemys[i];
				}
				// それ以外は除外する
				return null;
			});
			// 最後に、先頭に対象の敵を追加する
			new_arr.unshift(enemys[tg]);
			return new_arr;
		default:
			console.error("INVALID VALUE: " + ss.target + "(index: " + ei + ")");
			return null;
	}
}

// (内部用)[対象:味方]効果対象が単体か全体かを判別して適切な味方配列を返却
function ss_get_targetally(fld, ss, array, ai) {
	if (!ss) {
		return array;
	}
	switch (ss.target) {
		case "ally":
			return array;
		case "own":
			return [array[ai]];
		case "ally_one":
			var si = ss_allyselect_getindex(fld);
			return [array[si]];
		case "own_side":
			var rst = [];
			var max = fld.Allys.Deck.length;
			var min = 0;
			if(ai > min){
				rst.push(array[ai - 1]);
			}
			if(ai < max){
				rst.push(array[ai + 1]);
			}
			return rst;
		default:
			console.error("INVALID VALUE: " + ss.target + "(index: " + ai + ")");
			return null;
	}
}
