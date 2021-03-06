// ------------------------------------
// 潜在定義部分
// ------------------------------------
// コストダウン
function Costdown(d) {
	return {
		type: "costdown",
		down: d,
		name: "コストダウン" + int2roman(d),
		desc: "デッキコスト-" + d,
	}
}

// ファストスキル
function Fastskill(t) {
	return {
		type: "ss_fast",
		turn: t,			// 短縮ターン数
		name: "ファストスキル" + int2roman(t),
		desc: "初回のスペシャルスキル発動を" + t +"ターン短縮",
	}
}

// ステータスアップ
function Statusup(hp, atk) {
	if(hp != 0){
		tmpName = "HP";
		tmpValue = hp;
	}else if(atk != 0){
		tmpName = "攻撃力";
		tmpValue = atk;
	}
	if(tmpValue > 0){
		tmpUD = "アップ";
	}else{
		tmpUD = "ダウン";
		tmpValue = -tmpValue;
	}
	return {
		type: "own_status_up",
		up_hp: hp,
		up_atk: atk,
		name: tmpName + tmpUD + int2roman(tmpValue/100),
		desc: tmpName + "が" + tmpValue + tmpUD +"する"
	};
}

// 味方属性ステアップ
function Attr_statusup(hp, atk, attrs) {
	return {
		type: "status_up",
		attr: attrs,
		spec: create_specs(1),
		up_hp: hp,
		up_atk: atk,
		name: get_attr_string(attrs) + (hp != 0 ? "HP" : "攻撃力") + "アップ" + int2roman(Math.max(hp, atk)/100),
		desc: get_attr_string(attrs) + "の味方の" + (hp != 0 ? "HP" : "攻撃力") + "が" + Math.max(hp, atk) + "アップする"
	};
}

// 属性ステアップ/副属性でさらにステアップ
function Attr_statusup_sattr(hp, atk, attr, hp2, atk2, subattr) {
	return {
		type: "status_up",
		attr: attr,
		spec: create_specs(1),
		up_hp: hp,
		up_atk: atk,
		sub_attr: subattr,
		up_hp_2: hp2,
		up_atk_2: atk2,
		name: 	get_attr_string(attr) + (hp != 0 ? "HP" : "攻撃力") + "アップ" + int2roman(Math.max(hp, atk)/100) + "＋(副)" + 
				get_attr_string(subattr) + (hp2 != 0 ? "HP" : "攻撃力") + "アップ" + int2roman(Math.max(hp2, atk2)/100),
		desc: 	get_attr_string(attr) + "の味方" + (hp != 0 ? "HP" : "攻撃力") + "を" + Math.max(hp, atk) + "アップ、" + 
				"複属性が" + get_attr_string(subattr).replace("属性", "") + "だとさらに" + Math.max(hp2, atk2) + "アップ" 
	};
}

// 単属性ステアップ
function Attr_statusup_oattr(hp, atk, attr) {
	return {
		type: "status_up",
		attr: attr,
		spec: create_specs(1),
		up_hp: 0,
		up_atk: 0,
		sub_attr: {"-1": 1},
		up_hp_2: hp,
		up_atk_2: atk,
		name: "純属性" + (hp != 0 ? "HP" : "攻撃力") + "アップ" + int2roman(Math.max(hp, atk)/100) + "・" + get_attr_string(attr).replace("属性",""),
		desc: "純属性の" + (hp != 0 ? "HP" : "攻撃力") + "をアップ",
	};
}

// 複属性ステアップ
function Attr_statusup_subattr(hp, atk) {
	return {
		type: "status_up",
		attr: [1,1,1,1,1],
		spec: create_specs(1),
		up_hp: 0,
		up_atk: 0,
		sub_attr: [1,1,1,1,1],
		up_hp_2: hp,
		up_atk_2: atk,
		name: "複属性" + (hp != 0 ? "HP" : "攻撃力") + "アップ" + int2roman(Math.max(hp, atk)/100),
		desc: "複属性の" + (hp != 0 ? "HP" : "攻撃力") + "をアップ",
	};
}

// 味方種族ステアップ
function Spec_statusup(hp, atk, specs) {
	return {
		type: "status_up",
		attr: [1, 1, 1, 1, 1],
		spec: specific_specs(specs),
		up_hp: hp,
		up_atk: atk,
		name: get_spec_string(specs) + (hp != 0 ? "HP" : "攻撃力") + "アップ" + int2roman(Math.max(hp, atk)/100),
		desc: "種族が" + get_spec_string(specs) + "の味方の" + (hp != 0 ? "HP" : "攻撃力") + "が" + Math.max(hp, atk) + "アップする"
	};
}

// 九死一生(Narrow escape from the jaw of death)
function NEFTJOD(perc, hpcond) {
	if (!hpcond) {
		hpcond = 10;
	}
	return {
		type: "neftjod",
		perc: perc,
		hpcond: hpcond,
		name: "九死一生" + (hpcond==90 ? "Ξ" : int2roman(perc/30) + ""),
		desc: "HP" + hpcond + "%以上で致死ダメージを受けても確率" + perc +"%で生存",
	};
}

// パネルブースト
function Panel_boost(attrs, efv) {
	return {
		type: "panel_boost",
		attr: attrs,
		efv: efv,
		name: "パネルブースト" + int2roman(efv) + "・" + get_attr_string(attrs).replace("属性",""),
		desc: get_attr_string(attrs) + "パネルが出やすくなる（効果値："+efv+"）",
	};
}

// 属性軽減
function Attr_relief(attrs, perc) {
	return {
		type: "damage_relief",
		attr: attrs,
		spec: create_specs(1),
		perc: perc,
		name: get_attr_string(attrs) + "ダメージ軽減" + int2roman(perc/10) ,
		desc: get_attr_string(attrs) + "ダメージを" + perc + "%軽減する" ,
	};
}

// 種族軽減
function Spec_relief(spec, perc) {
	return {
		type: "damage_relief",
		attr: [1,1,1,1,1],
		spec: create_specs(1),
		spec_en: specific_specs(spec),
		perc: perc,
		name: get_spec_string(spec) + "ダメージ軽減" + int2roman(perc/10) ,
		desc: get_spec_string(spec) + "の敵からのダメージを" + perc + "%軽減する" ,
	};
}

// 戦後回復
function Heal_afterbattle(perc, ape) {
	return {
		type: "heal_after_battle",
		perc: perc,
		append_cond: ape,
		name: "バトル終了後にHP回復" + int2roman(perc/10),
		desc: "バトル終了後に味方全体のHPを" + perc + "%回復",
	};
}

// 異常無効
function Abstate_invalid(tg_type) {
	var tmptype = {
		"as_sealed": "アンサースキル封印",
		"ss_sealed": "SPスキル封印",
		"all_sealed": "封印",
		"poison": "毒",
		"death_limit": "死の秒針",
		"discharge": "ディスチャージ",
		"attr_weaken": "弱体化",
		"heal_reverse": "回復反転",
		"panic_shout": "パニックシャウト",
		"attr_reverse": "属性反転",
	};
	var mytg=(function(typs,tg){
		var outp="";
		if($.isArray(tg)){
			tg.forEach(function(t){
				outp+=typs[t]+"・";
			})
			outp=outp.slice(0,-1);
		}else{
			outp=typs[tg]
		}
		return outp;
	})(tmptype, tg_type)
	return {
		type: "abstate_invalid",
		tgtype: tg_type,
		name: mytg + "無効",
		desc: "敵スキルの" + mytg + "を無効化"
	};
}

// 通常エリアでのみステアップ
function Guild_statusup(hp, atk) {
	return {
		type: "own_status_up",
		up_hp: hp,
		up_atk: atk,
		name: "ギルドマスターの" + (hp != 0 ? "誓い" : "誇り") + int2roman(Math.max(hp, atk) / 100),
		desc: "通常エリアでのみ" + (hp != 0 ? "HP" : "攻撃力") + "が" + Math.max(hp, atk) + "アップする",
		cond: function (fld, oi, ai) {
			// 発動条件
			return false;
		}
	};
}

// デッキ単色時のみ味方ステアップ
function OnlyAttr_statusup(hp, atk, o_attr) {
	return {
		type: "status_up",
		up_hp: hp,
		up_atk: atk,
		attr: [1,1,1,1,1],
		spec: create_specs(1),
		onlyattr: o_attr,
		name: "デッキ単色時のみステアップ",
		desc: "デッキ単色時のみステアップ",
		cond: function (fld, oi, ai) {
			// 発動条件
			var rst = true;
			var dcs = fld.Allys.Deck;
			for (var i = 0; i < dcs.length; i++) {
				rst = rst && dcs[i].attr[0] == this.onlyattr && dcs[i].attr[1] == -1;
			}
			return rst;
		}
	};
}

// チェインブースト
function Awake_Chainboost(ch) {
	return {
		type: "awake_chboost",
		add: ch,
		name: "チェインブースト" + int2roman(ch),
		desc: "クエスト開始時のチェインを+" + ch + "する"
	};
}

// (L時発動)スペシャルスキルを発動
function Awake_SpecialSkill(spskill, p1, p2, p3, p4) {
	return {
		type: "awake_spskill",
		skill: spskill,
		p1: p1,
		p2: p2,
		p3: p3,
		p4: p4,
		name: "L時SP発動",
		desc: "L化時にスキルを発動する",
	};
}

// チェインガード
function Awake_chainguard(){
	return {
		type: "awake_chainguard",
		name: "チェインガード",
		desc: "1クエストに1度のみチェインを保護",
	}
}

// その他、試走に影響を及ぼさない潜在
function Awake_noeffect(name, efv) {
	return {
		type: "awake_noeffect",
		name: name,
		desc: name,
		efv: efv,
	}
}

// ------------------------------------
// 主に潜在結晶用の関数
// ------------------------------------
// 複合潜在能力
// （煌眼、覇眼等の複数効果を有する潜在能力定義用）
function Awake_composite(name, p1, p2, p3, p4) {
	return {
		type: "awake_composite",
		name: name,
		desc: name,
		proc: [p1, p2, p3, p4],
	};
}

// 最終ダメージ定数倍
function Awake_damage_multiple(rate, lowhp) {
	if (lowhp === undefined) {
		// 後方互換性維持(潜在結晶時)
		return {
			type: "awake_damage_multiple",
			rate: rate,
		}
	} else {
		// 普通の潜在に置く場合
		var desc = "ダメージを" + rate + "倍して、HPを" + lowhp + "下げる";
		return Awake_composite(desc, Statusup(-lowhp, 0), {
			type: "awake_damage_multiple",
			rate: rate,
		});
	}
}

// 烈眼
function Awake_retsugan(up_atk){
	return {
		name: `烈眼${up_atk > 500 ? "" : "の欠片"}(L時味方ATK+${up_atk},自傷10%)`,
		type: "status_up",
		attr: [1, 1, 1, 1, 1],
		spec: create_specs(1),
		up_hp: 0,
		up_atk,
		is_legend: true,
	};
}

// 攻撃力+X、被ダメージ*Y倍、回復効果を受けない
function Awake_dragonmode(up_atk, up_damaged) {
	var desc = "攻撃力+" + up_atk + ",被ダメージ" + up_damaged + "倍,回復しない";
	return Awake_composite(desc,
		Statusup(0, up_atk),
		Awake_damaged_multiple(up_damaged),
		Awake_noheal()
	);
}

// AS効果値アップ潜在
function Awake_ASkillRateup(upval, match_type, match_cond, div_rate) {
	match_type  = match_type || null;
	match_cond  = match_cond || null;
	div_rate    = div_rate || 1;
	return {
		type: "awake_answer_up",
		subtype: "awake_ans_rateup",
		upvalue: upval / div_rate,
		name: "AS効果値アップ(+" + upval + ")",
		desc: "ASの効果値を" + upval + "%アップする",
		matched_type: match_type,
		matched_cond: match_cond,
		matched_up: "rate",
	};
}

// AS連撃数アップ潜在
function Awake_ASkillAtknup(upval) {
	return {
		type: "awake_answer_up",
		subtype: "awake_ans_atknup",
		upvalue: upval,
		name: "AS連撃数アップ(+" + upval + ")",
		desc: "ASの連撃数を" + upval + "%アップする",
		matched_type: "attack",
		matched_up: "atkn_crystal",
	};
}

// SS効果値アップ潜在
function Awake_SkillRateup(upval, skl_type) {
	return {
		type: "awake_rateup",
		skilltype: skl_type,
		upvalue: upval,
		name: "SS効果値アップ(+" + upval + ")",
		desc: "SPスキルの効果値を" + upval + "%アップする",
	};
}

// Hit回数増加
function Awake_multihitadd(n) {
	return {
		type: "Awake_multihitadd",
		name: "SSヒット回数" + n + "回増加",
		desc: "SSのヒット回数を" + n + "回増加させる",
		upvalue: n,
	};
}

// チャージT減少
function Awake_chargeTurnMinus(n) {
	return {
		type: "Awake_chargeTurnMinus",
		name: "SSチャージ" + n + "T減少",
		desc: "SSのチャージターン数を" + n + "減少させる",
		downvalue: n,
	};
}

// 時限T減少
function Awake_bombTurnMinus(n) {
	return {
		type: "Awake_bombTurnMinus",
		name: "時限発動ターン" + n + "T減少",
		desc: "時限発動ターン数を" + n + "減少させる",
		upvalue: -n,
	};
}

// 大当たり結晶(威力UP+Hit数UP)
function Awake_RateAndHitup(r_up, h_up) {
	var eff1 = Awake_SkillRateup(r_up);
	var eff2 = Awake_multihitadd(h_up);
	var comp = Awake_composite("", eff1, eff2);
	comp.desc = "多段魔術の効果値を" + r_up + "%アップし、ヒット数を" + h_up + "増加させる";
	comp.name = "大当たりの結晶";
	return comp;
}

// ASCENSIVE結晶(ブースト効果値UP/自傷UP)
function Awake_ASCENSIVE(effup, dmgup){
	var desc = "ブースト効果値+" + effup + "%,自傷ダメージ+" + dmgup + "%";
	var eff1 = Awake_SkillRateup(effup, "ss_enhance_boost");
	eff1.type = "awake_rateup_boost";
	var eff2 = {
		type: "awake_dmgup_boost",
		upvalue: dmgup,
	}
	return Awake_composite(desc, eff1, eff2);
}

// SS継続ターン数アップ潜在
function Awake_Turnup(upval, skl_type) {
	return {
		type: "awake_turnup",
		skilltype: skl_type,
		upvalue: upval,
		name: "SS継続ターン数アップ(+" + upval + ")",
		desc: "SPスキルの継続ターン数を" + upval + "Tアップする",
	};
}

// 被ダメージ定数倍
function Awake_damaged_multiple(rate) {
	return {
		type: "awake_damaged_multiple",
		rate: rate,
	};
}

// 回復効果を受けない
function Awake_noheal() {
	return {
		type: "awake_no_heal",
	};
}

// 攻撃HP入れ替え
function Awake_HpAtk_replace() {
	return {
		type: "Awake_hpatk_replace",
		name: "HPATK入れ替え",
		desc: "HPと攻撃力の値を入れ替える",
	};
}

// セカンドファスト
function Awake_secondfast(t) {
	return {
		type: "ss_secondfast",
		turn: t,			// 短縮ターン数
		name: "セカンドファスト" + int2roman(t),
		desc: "2回目以降のスペシャルスキル発動を" + t + "ターン短縮",
	}
}

// ファスト+セカンドファスト
function Awake_Skillfast(t){
	var desc = "SS発動ターン短縮" + int2roman(t);
	var eff1 = Fastskill(t);
	var eff2 = Awake_secondfast(t);
	return Awake_composite(desc, eff1, eff2);
}

// 撃破時エンハ


// 撃破時回復
function Awake_KillHealSkill(count, rate) {
	return {
		type: "awake_killskill",
		skill: "ss_heal",
		p1: rate,
		//p2: p2,
		//p3: p3,
		//p4: p4,
		name: `${count}体撃破時HP回復`,
		desc: `${count}体撃破時にHPを${rate}%回復する`,
		count: count,
	};
}

// 撃破時自傷
function Awake_KillBurnSkill(count, rate) {
	return {
		type: "awake_killskill",
		skill: "ss_consumeCeil_all",
		p1: rate,
		//p2: p2,
		//p3: p3,
		//p4: p4,
		name: `${count}体撃破時HP自傷`,
		desc: `${count}体撃破時にHPを${rate}%自傷する`,
		count: count,
	};
}

// 撃破時チェイン+
function Awake_KillChPlusSkill(count, plus) {
	return {
		type: "awake_killskill",
		skill: "ss_addchain",
		p1: plus,
		//p2: p2,
		//p3: p3,
		//p4: p4,
		name: `${count}体撃破時Ch付与`,
		desc: `${count}体撃破時にチェインを${plus}増加する`,
		count: count,
	};
}


// -------------------
// 選ばれし者の証(※潜在結晶用)
function Awake_skillFC_atBoss(){
	return {
		type: "awake_skillFC_atBoss",
		name: "選ばれし者の証",
		desc: "ボス戦突入時にスキチャMAX/特殊攻略用",
	}
}
function Awake_doubleSkill_atBoss(){
	return {
		type: "Awake_doubleSkill_atBoss",
		name: "選ばれし者の名誉",
		desc: "ボス戦突入時にダブルスキル付与/特殊攻略用",
	}
}

