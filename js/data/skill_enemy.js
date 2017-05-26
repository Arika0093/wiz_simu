// -----------------------------------
// 基本
// -----------------------------------
// (内部用)Create enemy move object
function m_create_enemy_move(f, mdesc) {
	return {
		move: f,
		interval: 0,
		count: 0,
		argObj:getParentArg(),
		mdesc:mdesc
	};
}

// -----------------------------------
// 敵行動制御
// -----------------------------------
// 初回のみ行動
function m_enemy_once(e_skl) {
	var mdesc = e_skl.mdesc
	if(mdesc.indexOf("反射")==-1){
		mdesc = mdesc.slice(-1) == ")" ? mdesc.slice(0, -1)+"、" : mdesc+"("
		e_skl.mdesc =　mdesc + "初回のみ)"
	}
	return m_enemy_nturn(e_skl, 999);
}

// nターンに1回行動
function m_enemy_nturn(e_skl, n) {
	e_skl.interval = n;
	if(n!=999){
		var mdesc=e_skl.mdesc
		mdesc = mdesc.slice(-1) == ")" ? mdesc.slice(0, -1)+"、" : mdesc+"("
		e_skl.mdesc =　mdesc + n + "ターンに１回)"
	}
	return e_skl;
}

// 2回連続行動
function m_enemy_dualmove(skl1, skl2) {
	return m_create_enemy_move(function (fld, n, nows) {
		// ログ出力
		Field.log_push("Enemy[" + (n + 1) + "]: 2連続行動");
		// 順番に実行
		skl1.move(fld, n, nows);
		skl2.move(fld, n, nows);
	}, "2連続行動(" + skl1.mdesc + " / " + skl2.mdesc + ")");
}

// n回連続行動
function m_enemy_anymove() {
	// argumentをarrayに変換
	var args = Array.prototype.slice.call(arguments, 0);
	var desc = args.length + "連続行動(";
	for (var i = 0; i < args.length; i++) {
		desc += args[i].mdesc;
		if (i < args.length - 1) {
			desc += " / ";
		}
	}
	desc = desc + ")";
	return m_create_enemy_move(function (fld, n, nows) {
		// ログ出力
		Field.log_push("Enemy[" + (n + 1) + "]: " + args.length + "連続行動");
		// 順番に実行
		for (var i = 0; i < args.length; i++) {
			args[i].move(fld, n, nows);
		}
	}, desc);
}

// 現在HPが最も高い味方を狙う
function m_enemy_tgtype_maxhp() {
	return function (nows, tnum) {
		var nowhp_list = [];
		var tg = [];
		// listup
		for (var i = 0; i < nows.length; i++) {
			nowhp_list[i] = {
				hp: nows[i].nowhp,
				index: i,
			};
		}
		// sort
		nowhp_list.sort(function (a, b) {
			return b.hp - a.hp;
		});
		// push
		for (var i = 0; i < Math.min(tnum, nows.length); i++) {
			tg[i] = nowhp_list[i].index;
		}
		return tg;
	}
}

// 現在HPが最も低い味方を狙う
function m_enemy_tgtype_minhp() {
	return function (nows, tnum) {
		return m_enemy_tgtype_maxhp()(nows, 5).reverse().slice(0, tnum);
	}
}

// ダメージに反応してあれこれする(条件関数, 実行関数, ダメージフラグに関わらず常に実行するかどうか)
function damage_switch(cond, func, is_always) {
	var rst = m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		var on_cond = m_enemy_once(func);
		on_cond.count = 0;
		enemy.turn_effect.push({
			desc: null,
			type: "damage_switch",
			isdual: true,
			turn: -1,
			lim_turn: -1,
			effect: function () { },
			cond: cond.func,
			on_cond: on_cond,
			oncond_anytime: is_always === true,
		});
	}, "怒り条件：" + cond.desc);
	return rst;
}

// -----------------------------------
// 攻撃
// -----------------------------------
// (内部用)攻撃
function _s_enemy_attack(fld, dmg, ei, ai, is_dmg_const) {
	var e = GetNowBattleEnemys(ei);
	var cd = fld.Allys.Deck[ai];
	var now = fld.Allys.Now[ai];
	if (!is_dmg_const) {
		// 属性倍率
		var rate = attr_magnification(e.attr, cd.attr[0]);
		// 属性軽減取得
		var relief = card_dmg_relief(cd, now, e.attr);
		// パネル軽減取得
		var p_relief = 0;
		var p_guard = fld.Status.panel_guard;
		if (p_guard.attr[e.attr] > 0) {
			p_relief = p_guard.rate;
		}
		// 攻撃前スキル(主に弱体化)確認
		$.each(now.turn_effect, function (i, e) {
			e.bef_damage ? rate = e.bef_damage(fld, rate) : false;
		});
		// 乱数
		var rnd = damage_rand();
		// 仮ダメージ
		var dmg = Math.floor(dmg * (1 - relief) * (1 - p_relief) * rnd * rate);
		// ダメージブロックなどの確認
		$.each(now.turn_effect, function (i, e) {
			if (e.on_damage) {
				dmg = e.on_damage(fld, dmg, e.attr);
			}
		});
		// 敵ステアップ補正
		dmg *= e.statusup ? e.statusup : 1;
		// 最終補正値を取得
		var lst_multi = Awake_get_damaged_multiple(cd, now);
		dmg = Math.floor(dmg * lst_multi);
		// 最終ダメージ
		var l_dmg = dmg;
	} else {
		// ダメージブロックなどの確認
		$.each(now.turn_effect, function (i, e) {
			if (e.on_damage) {
				dmg = e.on_damage(fld, dmg, e.attr);
			}
		});
		var l_dmg = Math.floor(dmg);
	}
	damage_ally(l_dmg, ai, true);
	// ダメージフラグを立てる
	var n_dhits = now.flags.damage_hits[ei] ? now.flags.damage_hits[ei] : 0;
	now.flags.damage_hits[ei] = n_dhits + 1;
}

// 普通の攻撃(不利属性相手への単発ダメージ, 攻撃対象数, 攻撃回数, 攻撃対象詳細)
//   攻撃対象詳細: true: 連撃時攻撃対象を毎回変える / false: 変えない / func(): 条件指定
function s_enemy_attack(dmg, tnum, atkn, tgtype) {
	return m_create_enemy_move(function (fld, n, nows) {
		// ログ出力
		Field.log_push("Enemy[" + (n + 1) + "]: " +
			(tnum < fld.Allys.Deck.length ? tnum : "全") + "体" +
			(atkn > 1 ? atkn + "連撃(" : "攻撃(") + dmg + ")");
		// 攻撃対象取得
		var tg = gen_enemytarget_array(tnum, atkn, tgtype, nows);
		// 攻撃
		for (var i = 0; i < tg.length; i++) {
			for (var j = 0; j < tg[i].length; j++) {
				_s_enemy_attack(fld, dmg * 2, n, tg[i][j]);
			}
		}
	}, makeDesc("攻撃"));
}

// 属性特攻(有利属性時ダメ, 不利属性時ダメ, 特攻属性, 攻撃対象数, 攻撃回数, 対象詳細)
function s_enemy_attack_attrsp(dmg_s, dmg_n, attr, tnum, atkn, tgtype) {
	return m_create_enemy_move(function (fld, n, nows) {
		// ログ出力
		Field.log_push("Enemy[" + (n + 1) + "]: " +
			(tnum < fld.Allys.Deck.length ? tnum : "全") + "体属性特攻" +
			(atkn > 1 ? atkn + "連撃(" : "攻撃(") + dmg_s + ")");
		// 攻撃対象取得
		var tg = gen_enemytarget_array(tnum, atkn, tgtype, nows);
		// 攻撃
		for (var i = 0; i < tg.length; i++) {
			for (var j = 0; j < tg[i].length; j++) {
				var targ = tg[i][j];
				var cd = fld.Allys.Deck[targ];
				var e = GetNowBattleEnemys(targ);
				if(typeof(attr)=="number"){
					var dmg = (attr == cd.attr[0]) ? dmg_s : dmg_n;
				}else{
					var dmg = (attr[cd.attr[0]]==1) ? dmg_s : dmg_n;
				}
				_s_enemy_attack(fld, dmg * 2, n, targ);
			}
		}
	}, makeDesc("属性特攻",{attr:0,dmg_s:0,dmg_n:0,tnum:0,atkn:0}));
}

// 割合ダメージ(削り幅, 攻撃対象数, 対象詳細)
function s_enemy_attack_ratio(rate, tnum, tgtype) {
	return m_create_enemy_move(function (fld, n, nows, is_counter) {
		// ログ出力
		Field.log_push("Enemy[" + (n + 1) + "]: " +
			(tnum < fld.Allys.Deck.length ? tnum : "全") + "体割合攻撃(" +
			(rate * 100) + "%)");
		// 攻撃対象取得
		var tg = gen_enemytarget_array(tnum, 1, tgtype, nows);
		// 攻撃
		for (var i = 0; i < tg.length; i++) {
			for (var j = 0; j < tg[i].length; j++) {
				var targ = tg[i][j];
				var nw = fld.Allys.Now[targ];
				var dmg = nw.nowhp * rate;
				_s_enemy_attack(fld, dmg, n, targ, true);
				if (!is_counter) {
					// スキルカウンターを有効に
					nw.flags.skill_counter[n] = true;
				}
			}
		}
	}, makeDesc("割合ダメージ"));
}

// 亡者の怨念
function s_enemy_attack_deadgrudge(r1, r2, r3, tgtype) {
	return m_create_enemy_move(function (fld, n, nows, is_counter) {
		var rates = [r1, r2, r3, r3];
		var deadnum = 0;
		var es = GetNowBattleEnemys();
		$.each(es, function (i, e) {
			if (e.nowhp <= 0) {
				deadnum++;
			}
		});
		fld.log_push("Enemy[" + (n + 1) + "]: 亡者の怨念発動");
		return s_enemy_attack(rates[deadnum], 1, 1, tgtype).move(fld, n, nows, is_counter);
	}, makeDesc("亡者の怨念"));
}


// 吸収(削り幅, 回復値, 攻撃対象数)
function s_enemy_absorb(ratiorate, tnum, healvalue) {
	return m_create_enemy_move(function (fld, n, nows, is_counter) {
		// ログ出力
		Field.log_push("Enemy[" + (n + 1) + "]: " +
			(tnum < fld.Allys.Deck.length ? tnum : "全") + "体割合攻撃(" +
			(ratiorate * 100) + "%)");
		// 攻撃対象取得
		var tg = gen_enemytarget_array(tnum, 1, false, nows);
		// 攻撃
		for (var i = 0; i < tg.length; i++) {
			for (var j = 0; j < tg[i].length; j++) {
				var targ = tg[i][j];
				var nw = fld.Allys.Now[targ];
				var dmg = nw.nowhp * ratiorate;
				_s_enemy_attack(fld, dmg, n, targ, true);
				if (!is_counter) {
					// スキルカウンターを有効に
					nw.flags.skill_counter[n] = true;
				}
			}
		}
		var e = GetNowBattleEnemys(n);
		if (e.nowhp <= 0) { return; }
		var heal_v = healvalue;
		e.nowhp = Math.min(e.nowhp +heal_v, e.hp);
		fld.log_push("Enemy[" +(n +1) + "]: HP回復(" +heal_v + ")");
	}, makeDesc("吸収"));
}

// ターン終了時に攻撃(不利属性へのダメージ, 対象数)
function s_enemy_delay_attack(dmg, tnum, atkn) {
	atkn = atkn || 1;
	// 通常攻撃と同じものを取得
	var mov = s_enemy_attack(dmg, tnum, atkn, true);
	mov.priority = 99;

	return mov;
}


// -----------------------------------
// 状態異常攻撃
// -----------------------------------
// 状態異常攻撃テンプレ
// (Field, 説明, 種類, ターン数, 対象, 発動敵番号, 敵のカウンター攻撃かどうか, 追加内容, 異常無効貫通)
function s_enemy_abstate_attack(fld, desc, type, turn, target, ei, is_counter, f_obj, disable_guard) {
	var tg = !target.length ? gen_enemytarget_array(target, 1, false)[0] : target;
	f_obj = f_obj || {};
	// effect add
	for (var i = 0; i < tg.length; i++) {
		var logtext = "";
		var card = fld.Allys.Deck[tg[i]];
		var now = fld.Allys.Now[tg[i]];
		var eff_obj = $.extend(true, {}, {
			desc: desc,
			type: type,
			icon: type,
			isabstate: true,
			iscursebreak: false,
			isdual: false,
			isreduce_stg: true,
			turn: turn,
			lim_turn: turn,
			effect: function () { },
		}, f_obj);
		// 潜在の状態無効を確認
		var is_abs_guard_aw = Awake_AbsInvalid(card, now, type);
		// 異常攻撃前効果を発動させ、戻り値がfalseのものが1つ以上あったら無効
		// ユーザー側の攻撃前効果(ex: 異常無効)
		var is_abs_guard = $.grep(now.turn_effect, function (e) {
			return e.bef_absattack && !e.bef_absattack(fld, tg[i], ei);
		}).length > 0;
		// 攻撃側の攻撃前効果(ex: 回復反転の光闇除外)
		if(eff_obj.bef_absattack){
			is_abs_guard = is_abs_guard || !eff_obj.bef_absattack(fld, tg[i], ei);
		}
		if (!is_abs_guard && !is_abs_guard_aw && !disable_guard) {
			// 追加
			now.turn_effect.push(eff_obj);
			if (ei >= 0) {
				logtext += "Enemy[" + (ei + 1) + "]: ";
			}
			logtext += desc + "(" + turn + "t)(対象: Unit[" + (tg[i] + 1) + "])";
		} else {
			// 無効
			if (ei >= 0) {
				logtext += "Enemy[" + (ei + 1) + "]: ";
			}
			logtext += desc + "(" + turn + "t)(対象: Unit[" + (tg[i] + 1) + "])(無効)";
		}
		fld.log_push(logtext);
		if (!is_counter) {
			// スキルカウンターを有効に
			now.flags.skill_counter[ei] = true;
		}
		// スキル重複確認
		turn_effect_check(false);
	}
}

// 毒(効果値, 対象数, 継続ターン)
function s_enemy_poison(d, tnum, t) {
	return m_create_enemy_move(function (fld, n, pnow, is_counter) {
		s_enemy_abstate_attack(
			fld, "毒(" + d + ")", "poison", t, tnum, n, is_counter, {
				is_poison: true,
				effect: function (f, oi, teff, state, is_t, is_b, is_ss) {
					if (is_t && !is_b && !is_ss && state != "overlay") {
						f.log_push("Unit[" + (oi + 1) + "]: 毒(" + d + "ダメージ)");
						damage_ally(d, oi, true);
					}
				},
			}
		);
	}, makeDesc("毒"));
}

// 弱体化(対象属性, 効果値(ダメージ2倍なら2.0), 対象数, 継続ターン)
function s_enemy_attr_weaken(attr, rate, tnum, t) {
	return m_create_enemy_move(function (fld, n, pnow, is_counter) {
		var wattr_str = "";
		for (var i = 0; i < 5; i++) {
			if (attr[i] > 0) {
				if (wattr_str != "") {
					wattr_str += "/";
				}
				wattr_str += fld.Constants.Attr[i];
			}
		}
		s_enemy_abstate_attack(
			fld, "属性弱体化[" + wattr_str + "](" + rate + "倍)",
			"attr_weaken", t, tnum, n, is_counter, {
				bef_damage: function (fld, bef_rate) {
					return bef_rate * rate;
				},
			}
		);
	}, makeDesc("弱体化"));
}

// AS封印(対象数, 継続ターン)
function s_enemy_as_sealed(tnum, t) {
	return m_create_enemy_move(function (fld, n, pnow, is_counter) {
		s_enemy_abstate_attack(
			fld, "AS封印", "as_sealed", t, tnum, n, is_counter, {
				bef_answer: function (f, as) {
					return as.isdefault === true;
				}
			}
		);
	}, makeDesc("AS封印"));
}

// SS封印(対象数, 継続ターン)
function s_enemy_ss_sealed(tnum, t) {
	return m_create_enemy_move(function (fld, n, pnow, is_counter) {
		s_enemy_abstate_attack(
			fld, "SS封印", "ss_sealed", t, tnum, n, is_counter, {
				ss_disabled: true,
			}
		);
	}, makeDesc("SS封印"));
}

// 封印(対象数, 継続ターン)
function s_enemy_all_sealed(tnum, t) {
	return m_create_enemy_move(function (fld, n, pnow, is_counter) {
		s_enemy_abstate_attack(
			fld, "封印", "all_sealed", t, tnum, n, false, {
				bef_answer: function (f, as) {
					return false;
				},
				bef_skillcounter: function (f, ai) {
					return false;
				},
				ss_disabled: true,
			}
		);
	}, makeDesc("封印"));
}

// パニックシャウト(ダメージ, 対象数, 継続ターン)
// ダメージが0なら、ターゲット異常
function s_enemy_panicshout(damage, tnum, t) {
	if (damage > 0){
		// ダメージパニック
		return m_create_enemy_move(function (fld, n, pnow, is_counter) {
			s_enemy_abstate_attack(
				fld, "混乱(" + damage + "ダメージ)", "panicshout", t, tnum, n, is_counter, {
					ss_disabled: true,
					bef_answer: function (f, as) {
						return false;
					},
					panic_consume: true,
					panic_damage: damage,
				}
			);
		}, makeDesc("パニックシャウト"));
	}else{
		// タゲ異常パニック
		return m_create_enemy_move(function (fld, n, pnow, is_counter) {
			s_enemy_abstate_attack(
				fld, "混乱", "panicshout", t, tnum, n, is_counter, {
					ss_disabled: true,
					panic_target: true,
				}
			);
		}, makeDesc("パニックシャウト タゲ異常"));
	}
}

// 死の秒針(対象数, 残りターン)
function s_enemy_deathlimit(tnum, limit) {
	return m_create_enemy_move(function (fld, n, pnow, is_counter) {
		s_enemy_abstate_attack(
			fld, "死の秒針", "death_limit", limit, tnum, n, is_counter, {
				isreduce_stg: false,
				effect: function (f, oi, teff, state) {
					var nowtg = f.Allys.Now[oi];
					if (state == "end") {
						f.log_push("Unit[" + (oi+1) + "]: 死の秒針 - 残り0t");
						damage_ally(nowtg.maxhp, oi, true);
					}
				},
			}
		);
	}, makeDesc("死の秒針"));
}

// 回復反転(効果値, 対象数)
function s_enemy_healreverse(rate, tnum) {
	return m_create_enemy_move(function (fld, n, pnow, is_counter) {
		s_enemy_abstate_attack(
			fld, "回復反転(" + (rate*100) + "%)",
			"heal_reverse", -1, tnum, n, is_counter, {
				// 光闇属性なら反転は無効
				bef_absattack: function (fld, oi, ei) {
					var card = fld.Allys.Deck[oi];
					return !(card.attr.indexOf(3) >= 0 && card.attr.indexOf(4) >= 0);
				},
				effect: function(f, oi, teff, state, is_t, is_b){
					if(f.Enemys.Data[teff.receveButtle].enemy[teff.fromEnemy].nowhp <= 0){
						teff.lim_turn = 0;
					}
					if(is_b){
						teff.lim_turn = 0;
					}
				},
				// 回復反転値
				reverse_rate: rate,
				fromEnemy: n,
				receveButtle: fld.Status.nowbattle-1,
			}
		);
	}, makeDesc("回復反転"));
}

// 呪い(HP低下値, 対象数, 継続ターン)
function s_enemy_cursed(hpdown, tnum, t, atkdown) {
	return m_create_enemy_move(function (fld, n, pnow, is_counter) {
		atkdown = atkdown || 0;
		var tg = !tnum.length ? gen_enemytarget_array(tnum, 1, false)[0] : tnum;
		for (var i = 0; i < tg.length; i++) {
			var card = fld.Allys.Deck[tg[i]];
			var now = fld.Allys.Now[tg[i]];
			// 追加
			var eff_obj = $.extend(true, {}, {
				desc: "呪い(HP: " + (-hpdown) + (atkdown ? ", ATK: " + -atkdown : "") + ")",
				type: "curse",
				icon: "curse",
				isabstate: false,
				iscursebreak: false,
				isdual: false,
				isreduce_stg: true,
				turn: t,
				lim_turn: t,
				hpdown: hpdown,
				atkdown: atkdown,
				priority: -256,	// at last
				effect: function (f, oi, teff, state) {
					var nowtg = f.Allys.Now[oi];
					if (state == "first") {
						// 効果解除
						turneff_break_cond(nowtg.turn_effect, oi, function (teff) {
							return teff.iscursebreak;
						}, "break");
						// HP低下
						nowtg.upval_hp -= hpdown;
						nowtg.maxhp = Math.max(nowtg.def_awhp + nowtg.upval_hp, 1);
						nowtg.nowhp = Math.min(nowtg.maxhp, nowtg.nowhp);
						// ATK低下
						if (atkdown) {
							nowtg.upval_atk -= atkdown;
							nowtg.atk = Math.max(nowtg.def_awatk + nowtg.upval_atk, 0);
						}
						// エンハ効果値解除
						now.ss_enhance = 0;
						now.ss_boost_enhance = 0;
						now.ss_reinforcement_atk = 0;
					}
					else if (state == "end" || state == "overlay" | state == "dead") {
						nowtg.upval_hp += hpdown;
						nowtg.maxhp = Math.max(nowtg.def_awhp + nowtg.upval_hp, 1);
						if(state != "dead"){
							nowtg.nowhp = Math.min(nowtg.maxhp, nowtg.nowhp + hpdown);
						}
						if (atkdown) {
							nowtg.upval_atk += atkdown;
							nowtg.atk = Math.max(nowtg.def_awatk + nowtg.upval_atk, 0);
						}
					}
				},
			});
			// 潜在の状態無効を確認
			var is_abs_guard_aw = Awake_AbsInvalid(card, now, "curse");
			if (!is_abs_guard_aw) {
				now.turn_effect.push(eff_obj);
			}
			// スキルカウンターを有効に
			now.flags.skill_counter[n] = (is_counter ? false : true);
			fld.log_push("Enemy[" + (n + 1) + "]: 呪い(HP:" + (-hpdown) + "|" + (atkdown > 0 ? "|ATK:" + (-atkdown) : "")
				+ t + "t)(対象: Unit[" + (tg[i] + 1) + "])");
		}
		// 反射チェック
		turneff_check_skillcounter(fld);
		// スキル重複確認
		turn_effect_check(false);
	}, makeDesc("呪い"));
}

// 属性反転
function s_enemy_attrreverse(t, tnum){
	return m_create_enemy_move(function (fld, n, pnow, is_counter) {
		// 潜在を無効化した後かけ直す関数
		var func_reawake = function(fld, cards, nows){
			// 味方全員のステ上昇潜在を一旦無効化
			for(var i=0; i < nows.length; i++){
				var ntg = nows[i];
				ntg.maxhp = Math.max(ntg.def_hp, 1);
				ntg.nowhp = Math.min(ntg.maxhp, ntg.nowhp);
				ntg.atk = Math.max(ntg.def_atk, 0);
			}
			// 味方全体のステ上昇潜在を再度有効化
			for(var i=0; i < nows.length; i++){
				var isL = is_legendmode(cards[i], nows[i]);
				add_awake_ally(cards, nows, i, false, true);
				if(isL){
					add_awake_ally(cards, nows, i, true, true);
				}
			}
		}
		// 属性が一致しない場合、属性指定効果を無効化
		var func_invalid = function(fld, cards, nows, index){
			var card = cards[index];
			var now = nows[index];
			var teffs = now.turn_effect;
			for(var i=0; i < teffs.length; i++){
				var tf = teffs[i];
				if(tf.target_attr){
					var invalid_rst = (tf.target_attr[card.attr[0]] > 0);
					if(!invalid_rst){
						/* 無効化する
						 tf.effect(Field, index, tf, "break", false, false);
						 turneff_remove_pos(teffs, i);
						 i--;
						 */
						// 無効化チェックを働かせる
						tf.effect(fld, index, tf, "", false, false);
					}
				}
			}
		}
		
		// 攻撃ターゲットを取得
		var tg = gen_enemytarget_array(tnum, 1, false)[0];
		// 属性反転処理
		var cs = fld.Allys.Deck;
		for(var i=0; i < cs.length; i++){
			if(tg.indexOf(i) >= 0){
				var c = cs[i];
				// ここでは属性反転のみ行う(潜在/エンハンスの無効化処理は最後に行う)
				if(c.def_attr[1] != -1){
					c.attr[0] = c.def_attr[1];
					c.attr[1] = c.def_attr[0];
				}
			}
		}
		// 状態異常付与(解除時の処理, etc)
		s_enemy_abstate_attack(
			fld, "属性反転",
			"attr_reverse", t, tg, n, is_counter, {
				bef_absattack: function (f, oi, ei) {
					var card = f.Allys.Deck[oi];
					var defattr = this.def_attr = card.def_attr;
					return !(defattr[1] == -1);
				},
				effect: function(f, oi, teff, state, is_t, is_b){
					if(state == "dead" | state == "end"){
						// 属性を元に戻す
						var card = f.Allys.Deck[oi];
						card.attr[0] = teff.def_attr[0];
						card.attr[1] = teff.def_attr[1];
						// 潜在をかけ直す
						// 未解決事項(later-fix): 同時に何体も解除する時HP回復量がバグあり
						func_reawake(f, f.Allys.Deck, f.Allys.Now);
						// エンハ無効化
						func_invalid(f, f.Allys.Deck, f.Allys.Now, oi);
					}
				},
			}
		);
		// 反射チェック
		turneff_check_skillcounter(fld);
		// ここで全精霊の潜在をかけ直し、エンハ無効化処理を行う
		var cards = fld.Allys.Deck;
		var nows = fld.Allys.Now;
		// 潜在かけ直し
		func_reawake(fld, cards, nows);
		for(var i=0; i < cards.length; i++){
			if(tg.indexOf(i) >= 0) {
				var card = cards[i];
				if (card.def_attr[1] != -1) {
					// エンハ無効化
					func_invalid(fld, cards, nows, i);
				}
			}
		}
	}, makeDesc("属性反転"));
}

// -----------------------------------
// 反射/カウンター関係
// -----------------------------------
// スキル反射(単発ダメージ)
function skill_counter(damage, t) {
	return m_create_enemy_move(function(fld, n){
		var enemy = GetNowBattleEnemys(n);
		Field.log_push("Enemy[" + (n + 1) + "]: スキル反射待機");
		enemy.turn_effect.push({
			desc: "スキル反射(" + damage + ")",
			type: "skill_counter",
			icon: "skill_counter",
			isdual: false,
			turn: t,
			lim_turn: t,
			effect: function (){},
			on_ss_damage: function (f, ei, ai) {
				f.log_push("Enemy[" + (ei + 1) + "]: スキル反射発動(対象: Unit[" + (ai + 1) + "])");
				damage_ally(damage, ai, true);
			}
		});
	}, makeDesc("スキル反射"));
}

// スキル反射(スキル実行)
// (反射スキル関数「の関数」, 説明, ターン数, 反射が単体か, 反射スキル関数の引数1-4(単体反射の場合tnumの部分をnullに))
// (※実装を間違えてすごく雑な対応になってしまった)
function skill_counter_func(skill, desc, t, is_tgonly, p1, p2, p3, p4) {
	desc = skill(p1,p2,p3,p4).mdesc != undefined ? skill(p1,p2,p3,p4).mdesc : desc
	return m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		Field.log_push("Enemy[" + (n + 1) + "]: スキル反射待機");
		enemy.turn_effect.push({
			desc: "スキル反射(" + desc + ")",
			type: "skill_counter",
			icon: "skill_counter",
			isdual: false,
			turn: t,
			lim_turn: t,
			effect: function () { },
			on_ss_damage: function (f, ei, ai) {
				f.log_push("Enemy[" + (ei + 1) + "]: スキル反射発動" + 
					(is_tgonly ? "(対象: Unit[" + (ai + 1) + "])" : ""));
				var p_1 = (!is_tgonly || p1 !== null) ? p1 : [ai];
				var p_2 = (!is_tgonly || p2 !== null) ? p2 : [ai];
				var p_3 = (!is_tgonly || p3 !== null) ? p3 : [ai];
				var p_4 = (!is_tgonly || p4 !== null) ? p4 : [ai];
				skill(p_1, p_2, p_3, p_4).move(f, ei);
				// スキル反射には味方の反射は発動しない
				initialize_allys_flags(f.Allys.Now);
			}
		});
	}, "スキル反射 :"+desc);
}

// SS反応(味方スキルに反応する)
function skill_response(skill) {
	return m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		enemy.turn_effect.push({
			desc: null,
			type: "skill_response",
			isdual: false,
			turn: -1,
			lim_turn: -1,
			effect: function () { },
			on_ss_invoke: function (f, ei) {
				f.log_push("Enemy[" + (ei + 1) + "]: SS反応スキル発動");
				skill.move(f, ei);
			}
		});
	}, makeDesc("SS反応"));
}

// 物理カウンター(単発ダメージ)
function attack_counter(damage, t) {
	return m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		Field.log_push("Enemy[" + (n + 1) + "]: 物理カウンター");
		enemy.turn_effect.push({
			desc: "物理カウンター(" + damage + ")",
			type: "attack_counter",
			icon: "attack_counter",
			isdual: false,
			turn: t,
			lim_turn: t,
			effect: function () { },
			on_attack_damage: function (f, ei, ai) {
				f.log_push("Enemy[" + (ei + 1) + "]: 物理カウンター発動(対象: Unit[" + (ai + 1) + "])");
				_s_enemy_attack(f, damage, ei, ai, true);
			}
		});
	}, makeDesc("物理カウンター"));
}

// 物理カウンター(多段式ダメージ)
function attack_counter_dual(damage, t) {
	return m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		Field.log_push("Enemy[" + (n + 1) + "]: 物理カウンター");
		enemy.turn_effect.push({
			desc: "多段式カウンター(" + damage + ")",
			type: "attack_counter",
			icon: "attack_counter_dual",
			isdual: false,
			turn: t,
			lim_turn: t,
			effect: function () { },
			on_attack_damage: function (f, ei, ai) {
				f.log_push("Enemy[" + (ei + 1) + "]: 多段式カウンター発動(対象: Unit[" + (ai + 1) + "])");
				var atk_ct = GetNowBattleEnemys(ei).flags.is_as_attack[ai];
				for (var i = 0; i < atk_ct; i++) {
					_s_enemy_attack(f, damage, ei, ai, true);
				}
			}
		});
	}, makeDesc("多段式カウンター"));
}

// -----------------------------------
// ダメージ関係
// -----------------------------------
// ダメージブロック(自身)
function damage_block_own(bl, t) {
	return m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		Field.log_push("Enemy[" + (n + 1) + "]: ダメージブロック(" + bl + ")");
		enemy.turn_effect.push({
			desc: "ダメージブロック(" + bl + ")",
			type: "damage_block",
			icon: "damage_block",
			isdual: false,
			turn: t,
			lim_turn: t,
			priority: 1,
			effect: function () { },
			on_damage: function (fld, dmg, attr) {
				if (dmg >= bl || attr == -1) {
					return dmg;
				} else {
					return 0;
				}
			}
		});
	}, makeDesc("単体ダメブロ"));
}

// ダメージブロック(全体)
function damage_block_all(bl, t) {
	return m_create_enemy_move(function (fld, n) {
		var enemys = GetNowBattleEnemys();
		for (var i = 0; i < enemys.length; i++) {
			damage_block_own(bl, t).move(fld, i);
		}
	}, makeDesc("全体ダメブロ"));
}

// 属性ガード(単体)
function s_enemy_attrguard_own(attr, rate, turn) {
	return m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		// 属性表記
		var attr_text = "";
		for (var i = 0; i < attr.length; i++) {
			if (attr[i] > 0) {
				if (attr_text != "") {
					attr_text += "/";
				}
				attr_text += fld.Constants.Attr[i];
			}
		}
		// 追加
		enemy.turn_effect.push({
			desc: attr_text + "属性ガード(" + (rate * 100) + "%)",
			type: "attr_guard",
			icon: "attr_guard",
			isdual: false,
			turn: turn,
			lim_turn: turn,
			priority: 3,
			effect: function () { },
			on_damage: function (fld, dmg, atr_i) {
				if (attr[atr_i] > 0) {
					return dmg * (1 - rate);
				} else {
					return dmg;
				}
			}
		});
		Field.log_push("Enemy[" + (n + 1) + "]: [" + attr_text + "]属性ガード(" + (rate * 100) + "%)");
	}, makeDesc("単体軽減"));
}

// 属性ガード(全体)
function s_enemy_attrguard_all(attr, rate, turn) {
	return m_create_enemy_move(function (fld, n) {
		var enemys = GetNowBattleEnemys();
		for (var i = 0; i < enemys.length; i++) {
			s_enemy_attrguard_own(attr, rate, turn).move(fld, i);
		}
	}, makeDesc("全体軽減"));
}

// 敵属性吸収(単体)
function s_enemy_attr_absorb(attr, rate, turn) {
	return m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		// 属性表記
		var attr_text = "";
		for (var i = 0; i < attr.length; i++) {
			if (attr[i] > 0) {
				if (attr_text != "") {
					attr_text += "/";
				}
				attr_text += fld.Constants.Attr[i];
			}
		}
		// 追加
		enemy.turn_effect.push({
			desc: attr_text + "属性吸収(" + (rate * 100) + "%)",
			type: "attr_absorb",
			icon: null,
			isdual: false,
			turn: turn,
			lim_turn: turn,
			priority: 4,
			effect: function () { },
			on_damage: function (fld, dmg, atr_i) {
				if (attr[atr_i] > 0) {
					// 吸収
					var ed = GetNowBattleEnemys(n);
					ed.nowhp = Math.min(ed.hp, ed.nowhp + dmg * rate);
					Field.log_push("Enemy[" + (n + 1) + "]: 属性吸収(HP+" + (dmg * rate) + ")");
					return 0;
				} else {
					return dmg;
				}
			}
		});
		Field.log_push("Enemy[" + (n + 1) + "]: [" + attr_text + "]属性吸収(" + (rate * 100) + "%/" + turn + "t)");
	}, makeDesc("属性吸収"));
}

// 敵属性吸収(全体)
function s_enemy_attr_absorb_all(attr, rate, turn) {
	return m_create_enemy_move(function (fld, n) {
		var absorb = s_enemy_attr_absorb(attr, rate, turn);
		var enemys = GetNowBattleEnemys();
		for (var i = 0; i < enemys.length; i++) {
			absorb.move(fld, i);
		}
	}, makeDesc("属性吸収[全体]"));
}

// 単体バリア
function s_enemy_barrier_own(dmg, turn) {
	return m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		// 追加
		enemy.turn_effect.push({
			desc: "バリアウォール(" + dmg + ")",
			type: "barrier_wall",
			icon: "barrier",
			isdual: false,
			turn: turn,
			lim_turn: turn,
			priority: 5,
			barr_endurance: dmg,
			effect: function (f, oi, teff, state, is_t, is_b) {
				if (this.barr_endurance <= 0) {
					teff.lim_turn = 0;
				}
			},
			on_damage: function (fld, dmg, atr_i) {
				var is_invalid = false;
				if (this.barr_endurance > 0) {
					// 無効化
					var bf = this.barr_endurance;
					var af = this.barr_endurance - dmg;
					Field.log_push("Enemy[" + (n + 1) + "]: バリアウォール(残: " + bf + "→" + af + ")");
					this.barr_endurance -= dmg;
					is_invalid = true;
				}
				return is_invalid ? 0 : dmg;
			}
		});
		Field.log_push("Enemy[" + (n + 1) + "]: バリアウォール(" + dmg + "/" + turn + "t)");
	}, makeDesc("バリアウォール"));
}

// 全体バリア
function s_enemy_barrier_all(dmg, turn) {
	return m_create_enemy_move(function (fld, n) {

		barr_endu = dmg_base = dmg;
		var barr_all = {
			desc: "バリアウォール(" + dmg + ")",
			type: "barrier_wall",
			icon: "barrier",
			isdual: false,
			turn: turn,
			lim_turn: turn,
			priority: 5,
			effect: function (f, oi, teff, state, is_t, is_b) {
				if(barr_endu === null){
					return;
				}
				if (barr_endu <= 0) {
					// break
					teff.lim_turn = 0;
					// 全滅してたら巻き戻し用にbarr_enduをnullに指定
					if(is_allkill()){
						barr_endu = null;	// for reverse
					}
				} else {
					teff.desc = "バリアウォール(" + barr_endu + "/" + dmg + ")";
				}
			},
			on_damage: function (fld, dmg, atr_i) {
				var is_invalid = false;
				if(barr_endu === null){
					barr_endu = dmg_base;
				}
				if (barr_endu > 0) {
					// 無効化
					var bf = barr_endu;
					var af = Math.max(bf - dmg, 0);
					Field.log_push("Enemy[" + (n + 1) + "]: バリアウォール(残: " + bf + "→" + af + ")");
					barr_endu = af;
					is_invalid = true;
				}
				return is_invalid ? 0 : dmg;
			}
		};
		var enemys = GetNowBattleEnemys();
		// 追加
		for (var i = 0; i < enemys.length; i++) {
			enemys[i].turn_effect.push(barr_all);
		}
		Field.log_push("Enemy[" + (n + 1) + "]: バリアウォール[全体](" + dmg + "/" + turn + "t)");
	}, makeDesc("バリアウォール[全体]"));
}

// 単体多層バリア
function s_enemy_multibarrier_own(dmg, turn) {
    return m_create_enemy_move(function (fld, n) {
        var enemy = GetNowBattleEnemys(n);
        // 追加
        enemy.turn_effect.push({
            desc: "多層バリア(" + dmg + ")",
            type: "barrier_wall",
            icon: "multibarrier",
            isdual: false,
            turn: turn,
            lim_turn: turn,
            priority: 5,
            barr_endurance: dmg,
            effect: function (f, oi, teff, state, is_t, is_b) {
                if (this.barr_endurance <= 0) {
                    teff.lim_turn = 0;
                }
            },
            on_damage: function (fld, dmg, atr_i) {
                var is_invalid = false;
                if (this.barr_endurance > 0) {
                    // 無効化
                    var bf = this.barr_endurance;
                    var af = this.barr_endurance - 1;
                    Field.log_push("Enemy[" + (n + 1) + "]: 多層バリア(残: " + bf + "→" + af + ")");
                    this.barr_endurance -= 1;
                    is_invalid = true;
                }
                return is_invalid ? 0 : dmg;
            }
        });
        Field.log_push("Enemy[" + (n + 1) + "]: 多層バリア(" + dmg + ")");
    }, makeDesc("多層バリア"));
}

// 全体多層バリア
function s_enemy_multibarrier_all(dmg, turn) {
    return m_create_enemy_move(function (fld, n) {
        var enemy = GetNowBattleEnemys();
        // 追加
		for(var i=0; i < enemy.length; i++){
			var e = enemy[i];
            e.turn_effect.push({
                desc: "多層バリア(" + dmg + ")",
                type: "barrier_wall",
                icon: "multibarrier",
                isdual: false,
                turn: turn,
                lim_turn: turn,
                priority: 5,
                barr_endurance: dmg,
                effect: function (f, oi, teff, state, is_t, is_b) {
                    if (this.barr_endurance <= 0) {
                        teff.lim_turn = 0;
                    }
                },
                on_damage: function (fld, dmg, atr_i) {
                    var is_invalid = false;
                    if (this.barr_endurance > 0) {
                        // 無効化
                        var bf = this.barr_endurance;
                        var af = this.barr_endurance - 1;
                        Field.log_push("Enemy[" + (n + 1) + "]: 多層バリア(残: " + bf + "→" + af + ")");
                        this.barr_endurance -= 1;
                        is_invalid = true;
                    }
                    return is_invalid ? 0 : dmg;
                }
            });
		}
        Field.log_push("Enemy[" + (n + 1) + "]: 全体多層バリア(" + dmg + ")");
    }, makeDesc("多層バリア"));
}

// 挑発
function s_enemy_taunt(turn) {
	return m_create_enemy_move(function (fld, n) {
		$("#attack_target_sel").val(n);
		Field.log_push("Enemy[" + (n + 1) + "]: 挑発(" + turn + "t)");
	}, makeDesc("挑発"));
}

// 鉄壁防御
function impregnable(t) {
	return m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		Field.log_push("Enemy[" + (n + 1) + "]: 鉄壁防御");
		enemy.turn_effect.push({
			desc: "鉄壁防御",
			type: "impregnable",
			icon: "impregnable",
			isdual: false,
			turn: t,
			lim_turn: t,
			priority: 2,
			effect: function () { },
			on_damage: function (fld, dmg, attr) {
				if (dmg < 1) {
					return 0;
				}
				return 1;
			}
		});
	}, makeDesc("鉄壁"));
}

// -----------------------------------
// 敵状態変化 etc.
// -----------------------------------
// 分裂(自分自身が残った場合に発動/何回でも発動)
function s_enemy_division(copyhp) {
	return m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		var push_oncond = m_create_enemy_move(function (f, i) {
			// 複製先
			var copyto = i != 0 ? 0 : 1;
			var hprate = copyhp ? copyhp : 1;
			var ens = f.Enemys.Data[f.Status.nowbattle - 1].enemy;
			ens[copyto] = $.extend(true, {}, GetNowBattleEnemys(i));
			ens[copyto].nowhp = ens[copyto].hp * hprate;
			fld.log_push("Enemy[" + (n + 1) + "]: 分裂");
		});
		delete push_oncond.argObj;

		enemy.turn_effect.push({
			desc: null,
			type: "enemy_division",
			isdual: false,
			turn: -1,
			lim_turn: -1,
			effect: function () { },
			cond: s_enemy_when_dead_l().func,
			on_cond: push_oncond,
			oncond_anytime: true,
		});
	}, makeDesc("分裂待機"));
}

// 敵全体を回復
function s_enemy_heal_all(rate) {
	return m_create_enemy_move(function (fld, n) {
		var es = GetNowBattleEnemys();
		$.each(es, function (i, e) {
			if (e.nowhp <= 0) { return; }
			var heal_v = e.hp * rate;
			e.nowhp = Math.min(e.nowhp + heal_v, e.hp);
			fld.log_push("Enemy[" + (i + 1) + "]: HP回復(" + heal_v + ")");
		})
	}, makeDesc("全体回復"));
}

// 自分自身を回復
function s_enemy_heal_own(rate) {
	return m_create_enemy_move(function (fld, n) {
		var e = GetNowBattleEnemys(n);
		if (e.nowhp <= 0) { return; }
		var heal_v = e.hp * rate;
		e.nowhp = Math.min(e.nowhp +heal_v, e.hp);
		fld.log_push("Enemy[" +(n +1) + "]: HP回復(" +heal_v + ")");
	}, makeDesc("単体回復")); 
}

// 全蘇生
function s_enemy_resurrection(rate) {
	return m_create_enemy_move(function (fld, n) {
		var es = GetNowBattleEnemys();
		$.each(es, function (i, e) {
			var heal_v = e.hp * rate;
			if (e.nowhp <= 0) {
				e.nowhp = heal_v;
			}
			fld.log_push("Enemy[" + (i + 1) + "]: 蘇生(" + rate + "%)");
		})
	}, makeDesc("蘇生"));
}

// 力溜め
function s_enemy_force_reservoir() {
	return m_create_enemy_move(function (fld, n) {
		var enemy = GetNowBattleEnemys(n);
		fld.log_push("Enemy[" + (n + 1) + "]: 力溜め");
		enemy.turn_effect.push({
			desc: "力溜め",
			type: "force_reservoir",
			icon: "force_reservior",	// typo
			isdual: false,
			turn: -1,
			lim_turn: -1,
			effect: function () { },
		});
	}, makeDesc("力溜め"));
}

// 怒り状態
function m_enemy_angry() {
	return m_create_enemy_move(function (fld, n) {
		var e = GetNowBattleEnemys(n);
		// 怒り状態にする
		e.move.isangry = true;
		// log
		fld.log_push("Enemy[" + (n + 1) + "]: 怒り");
		// 怒り時のスキルを発動
		if (e.move.on_angry) {
			for (var i = 0; i < e.move.on_angry.length; i++) {
				e.move.on_angry[i].move(fld, n);
			}
		}
		// 怒り行動が定義されている場合参照カウントをリセット
		if (e.move.on_move_angry) {
			e.move.m_index = 0;
		}
	}, makeDesc("怒り"));
}

// ステータスアップ(効果値分だけダメージ増加)
function s_enemy_statusup(isall, up_rate, turn) {
	return m_create_enemy_move(function (fld, n) {
		if (isall) {
			var es = GetNowBattleEnemys();
			for (var i = 0; i < es.length; i++) {
				var e = es[i];
				e.statusup = (e.statusup ? e.statusup + up_rate : e.statusup);
				fld.log_push("Enemy[" + (n + 1) + "]: 敵ステータスアップ(" + up_rate + ")");
			}
		} else {
			var e = GetNowBattleEnemys(n);
			e.statusup = (e.statusup ? e.statusup + up_rate : e.statusup);
			fld.log_push("Enemy[" + (n + 1) + "]: 敵ステータスアップ(" + up_rate + ")");
		}
	}, makeDesc("敵ステータスアップ"));
}

// 属性変化
function attr_change(attr) {
	return m_create_enemy_move(function (fld, n) {
		var e = GetNowBattleEnemys(n);
		var bef = e.attr;
		e.attr = attr;
		fld.log_push("Enemy[" + (n + 1) + "]: 属性変化("
			+ fld.Constants.Attr[bef] + "→" + fld.Constants.Attr[attr] + ")");
	}, makeDesc("属性変化"));
}

// 全滅時に復活
function s_enemy_reverse(rev_i) {
	return m_create_enemy_move(function (fld, n) {
		// 現在の戦闘を取得
		var bdata = Field.Enemys.Data[Field.Status.nowbattle - 1]
		// 復活先を指定
		bdata.rev_used = n;			// 復活処理を発動させた敵の番号
		bdata.rev_index = rev_i;	// 復活先の番号
		bdata.rev_check = false;
	}, makeDesc("全滅時復活"));
}

// -----------------------------------
// フィールド干渉
// -----------------------------------
// 継続ダメージ
function s_enemy_continue_damage(turn, initialdamage, continuedamage){
	initialdamage *= 2;
	continuedamage *= 2;
	return m_create_enemy_move(function (fld, n) {
		fld.log_push("Enemy[" + (n + 1) + "]: 継続ダメージ(ダメージ:" + initialdamage + ", " + continuedamage + ")");
		var tg = gen_enemytarget_array(5, 1, false);
		for (var i = 0; i < tg[0].length; i++) {
			_s_enemy_attack(fld, initialdamage, n, tg[0][i], false);
			// スキルカウンターを有効に
			Field.Allys.Now[tg[0][i]].flags.skill_counter[n] = true;
		}
		ss_continue_effect_add({
			type: "continue_damage_by_enemy",
			isdemerit: true,
			turn: turn,
			lim_turn: turn,
			continuedamage: continuedamage,
			// 参照用にコピーを取る
			now_state: $.extend(true, {}, fld.Enemys.Data[n]),
			effect: function (f, oi, ceff) {
				if (!f.Status.finish) {
					var f_copy = $.extend(true, {}, f);
					f_copy.Enemys.Data[oi] = ceff.now_state;
					var tg = gen_enemytarget_array(5, 1, false);
					for (var i = 0; i < tg[0].length; i++) {
						_s_enemy_attack(f_copy, continuedamage, n, tg[0][i], false);
					}
					fld.log_push("Enemy[" + (n + 1) + "]: 継続ダメージ発動(" + continuedamage + "ダメージ) - 残り" + ceff.lim_turn + "t");
				}
			}
		});
	}, makeDesc("残滅大魔術"));
}


// チェイン解除
function s_enemy_chain_break() {
	return m_create_enemy_move(function (fld, n) {
		if (fld.Status.chain_status <= 0) {
			fld.Status.chain = 0;
			fld.log_push("Enemy[" + (n + 1) + "]: チェイン解除");
		} else {
			fld.log_push("Enemy[" + (n + 1) + "]: チェイン解除(無効)");
		}
	}, makeDesc("チェイン解除"));
}

// チェイン減少
function s_enemy_chainreduce(ch) {
	return m_create_enemy_move(function (fld, n) {
		if (fld.Status.chain_status <= 0) {
			fld.Status.chain -= Math.min(ch, fld.Status.chain);
			fld.log_push("Enemy[" + (n + 1) + "]: チェイン減少: " + ch);
		} else {
			fld.log_push("Enemy[" + (n + 1) + "]: チェイン減少(無効)");
		}
	}, makeDesc("チェイン減少"));
}

// チェイン封印
function s_enemy_chain_sealed(t) {
	return m_create_enemy_move(function (fld, n) {
		if (fld.Status.chain_status <= 0) {
			fld.Status.chain_status = -1;
			fld.Status.chainstat_turn = t;
			fld.log_push("Enemy[" + (n + 1) + "]: チェイン封印(" + t + "t)");
		} else {
			fld.log_push("Enemy[" + (n + 1) + "]: チェイン封印(無効)");
		}
	}, makeDesc("チェイン封印"));
}

// -----------------------------------
// その他
// -----------------------------------
// 何もしない
function s_enemy_noeffect(mdesc) {
	return m_create_enemy_move(function (fld, n) {
		// log output
		fld.log_push("Enemy[" + (n + 1) + "]: " + mdesc);
	}, mdesc);
}

// パネル変換
function s_enemy_panelchange(attr) {
	var sm = 0;
	$.each(attr, function (i, e) {
		sm += e;
	})
	var text = (sm >= 2) ? "パネルシャッフル" : "パネル変換";
	return m_create_enemy_move(function (fld, n) {
		// log output
		fld.log_push("Enemy[" + (n + 1) + "]: " + text);
	}, text);
}

// スキルディスチャージ
function s_enemy_discharge(tnum, minus_turn) {
	return m_create_enemy_move(function (fld, n) {
		var nows = fld.Allys.Now;
		$.each(nows, function (i, e) {
			// 潜在の状態無効を確認
			var card = fld.Allys.Deck[i];
			var is_abs_guard_aw = Awake_AbsInvalid(card, nows[i], "discharge");
			if (is_abs_guard_aw) {
				return false;
			}
			var endcharge = card.islegend ? card.ss2.turn : card.ss1.turn;
			var is_lgmode = card.islegend & endcharge <= e.ss_current;
			e.ss_current = Math.max(Math.min(endcharge, e.ss_current) - minus_turn, 0);
			// Lモードなら覚醒解除
			if (is_lgmode) {
				minus_legend_awake(Field.Allys.Deck, Field.Allys.Now, i);
				nows[i].islegend = false;
				Field.log_push("Unit[" + (i + 1) + "]: Lモード解除");
			}
			// スキルカウンターを有効に
			nows[i].flags.skill_counter[n] = true;
		});
		fld.log_push("Enemy[" + (n + 1) + "]: スキルディスチャージ(-" + minus_turn + "t)");
	}, makeDesc("スキルディスチャージ"));
}

// -----------------------------------
// 条件
// -----------------------------------
// 指定した敵が倒れる
function s_enemy_when_dead(i1, i2) {
	return {func: function (fld, n) {
		var rst = true;
		var e = GetNowBattleEnemys(i1);
		rst = rst && e.nowhp <= 0;
		if (i2 !== undefined) {
			e = GetNowBattleEnemys(i2);
			rst = rst && e.nowhp <= 0;
		}
		return rst;
	}, desc: "敵"+(i1+1)+(i2 == undefined ?"" : "もしくは敵"+(i2+1))+"が倒れたら"};
}

// 敵1体が倒れる
function s_enemy_when_dead_s() {
	return {func: function (fld, n) {
		var rst = false;
		var es = GetNowBattleEnemys();
		for (var i = 0; i < es.length; i++) {
			if (i == n) { continue; }
			rst = rst || es[i].nowhp <= 0;
		}
		return rst;
	}, desc: "敵1体が倒れる"};
}

// 敵自身以外が倒れる
function s_enemy_when_dead_l() {
	return {func: function (fld, n) {
		var rst = true;
		var es = GetNowBattleEnemys();
		for (var i = 0; i < es.length; i++) {
			if (i == n) { continue; }
			rst = rst && es[i].nowhp <= 0;
		}
		return rst;
	}, desc: "自身以外全員が倒れる"};
}

// HPが指定%以下
function s_enemy_when_hpdown(rate) {
	return {func: function (fld, n) {
		var e = GetNowBattleEnemys(n);
		return e.nowhp <= Math.floor(e.hp * rate);
	}, desc: "HPが" + rate * 100 + "％以下"};
}

// ターン経過
function s_enemy_when_after_turn(t) {
	return {
		func: function (fld, n, is_ss, is_preem) {
			var n_t = fld.Status.nowturn - (is_ss ? 1 : 0) - (is_preem ? 1 : 0);
			return t <= n_t;
		},
		desc: t + "ターン経過"
	};
}

// enemy_skillのDescを作る
// 表示順を変えたいとき、属性特攻を参考にorderを指定してください。
// IEだと正常に動作しなそうなので、無効にしています。
function makeDesc(mystr, order){
	argObj = getParentArg()
	if (!argObj) {
		return "[ERROR: InternetExplorer is not supported]";
	}
	var outpStr = mystr
	var toStr
	var flag = 1;
	order = order != undefined ? order : argObj
	for (var prop in order){
		toStr = argObj[prop]
		if(prop != "__fname__" && toStr != undefined && typeof(toStr)!= "function" && toStr != 0){
			//toStr = comma3(toStr)
			toStr = prop != "tnum" ? toStr : toStr == 5 ? "全体" : toStr == 1 ? "単体" : toStr+"体"
			toStr = prop != "attr" ? toStr : get_attr_string(toStr) 
			toStr = prop != "rate" ? toStr : toStr * 100 + "％"
			toStr = ["turn","t"].indexOf(prop)==-1 ? toStr : toStr != -1 ? toStr : "永続"
			toStr = ["turn","t","minus_turn"].indexOf(prop)==-1 ? toStr : typeof(toStr)!="number" ? toStr : toStr+"T"
			toStr = prop != "atkn" ? toStr : toStr == 1 ? "" : toStr + "連撃"
			toStr = ["d","dmg","damage","bl"].indexOf(prop)==-1 ? toStr : Math.floor(toStr) + "ダメージ"
			toStr = prop != "dmg_s" ? toStr : "@BS@特攻/" + toStr + ""
			toStr = prop != "dmg_n" ? toStr : "通常/" + toStr + ""
			toStr = prop != "initialdamage" ? toStr : "初回" + toStr + ""
			toStr = prop != "continuedamage" ? toStr : "継続" + toStr + ""
			toStr = prop != "r1" ? toStr : "0体/" + toStr
			toStr = prop != "r2" ? toStr : "1体/" + toStr
			toStr = prop != "r3" ? toStr : "2体/" + toStr
			toStr = prop != "limit" ? toStr : "残り" + toStr + "T"
			toStr = prop != "copyhp" ? toStr : "分裂時HP：" + (toStr * 100) + "％"
			toStr = prop != "hpdown" ? toStr : "HP-" + toStr
			toStr = prop != "atkdown" ? toStr : "ATK-" + toStr
			toStr = prop != "desc" ? toStr : toStr+" "
			toStr = prop != "healvalue" ? toStr : toStr+"回復"
			toStr = prop != "ratiorate" ? toStr : toStr * 100 + "％削り"
			toStr = prop != "ch" ? toStr : toStr + "chain"
			toStr = ["tgtype", "p1", "p2", "p3", "p4"].indexOf(prop) == -1 ? toStr : ""
			outpStr += toStr == "" ? "" : flag==1 ? " (" : "、"
			toStr = toStr == "" ? "" : toStr != comma3(argObj[prop]) ? toStr : "<font color=red>#DEF!</font>" + prop
			flag = toStr == "" ? flag :  0
			outpStr += toStr
		}
	}
	outpStr = outpStr.replace(/.@BS@/g,"")
	outpStr += flag==0 ? ")" : ""
	return outpStr
}
