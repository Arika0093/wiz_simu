// -------------------------
// 精霊データ
// -------------------------
Cards = [
	/* 参考用データ ----------------
	{
		// 名前
		name: "デバッグに使いたまえよ つよい方の元帥",
		// 図鑑番号
		cardno: -1,
		// 画像読み込み用番号
		imageno: 3836,
		// LvMaxの時のHP
		hp: 4545,
		// LvMaxの時の攻撃力
		atk: 10293,
		// コスト
		cost: 500,
		// L精霊かどうか
		islegend: false,
		// 属性(0: fire, 1: water, 2: thunder, 3: light, 4: dark, -1: none)
		attr: [2,1],
		// 種族(0: 龍族, 1: 神族, 2: 魔族, 3: 天使, 4: 妖精, 5: 亜人, 
		//     6: 物質, 7: 魔法生物, 8: 戦士, 9: 術士, 10: アイテム, 11: AbCd)
		species: [8],
		// 潜在能力
		awakes: [
			// HPアップ200
			Statusup(200, 0),
			// パネルブースト雷Ⅰ
			Panel_boost([0, 0, 1], 1),
			// ファストスキルⅡ
			Fastskill(2),
			// 九死一生Ⅰ(30%)
			NEFTJOD(30),
			// パネルブースト雷Ⅰ
			Panel_boost([0, 0, 1], 1),
			// 雷属性攻撃力UpⅠ
			Attr_statusup(0, 100, [0, 0, 1]),
			// 水属性ダメージ軽減Ⅰ
			Attr_relief([0,1,0,0,0], 10),
			// 戦士攻撃力UpⅡ
			Spec_statusup(0, 200, [8]),
			// 戦士HPUpⅡ
			Spec_statusup(200, 0, [8]),
			// 戦後HP回復Ⅰ(10%)
			Heal_afterbattle(10),
		],
		// アンサースキル1
		as1: {
			// 説明
			desc: "3チェインで敵全体へダメージ(効果値: 1000)",
			// 内容
			proc: ChainAllAttack(10, 3),
		},
		// スペシャルスキル1
		ss1: {
			// 説明
			desc: "敵全体へ雷・水属性のダメージ(効果値: 220)",
			// 発動にかかるターン
			turn: 3,
			// 内容
			proc: [ss_damage_all(2.2, [2,1])],
		},
	},
	*/
	// ---------------------------------
	// wiz_selection 2015/06
	{ name: "激烈大魔法使い アリエッタ・トワ", cardno: 4691, imageno: 5900, hp: 1665, atk: 4179, cost: 45, islegend: true, attr: [1, 0], species: [9], awakes: [Fastskill(1), Panel_boost([0, 1, 0], 1), Attr_statusup(0, 100, [0, 1, 0]), NEFTJOD(30), Statusup(0, 200), Attr_statusup(100, 0, [0, 1, 0]), Attr_relief([0, 0, 1, 0, 0], 20), Fastskill(2), Spec_statusup(0, 200, [9]), Spec_statusup(200, 0, [9]), ], Lawake: [Attr_statusup(0, 100, [0, 1, 0]), Statusup(0, 500), ], as1: { desc: "3チェインで敵単体を3回連続攻撃(効果値:250)", proc: ChainDualAttack(3.5, 3, 3), }, ss1: { desc: "敵単体へ水・火属性の5回連続ダメージ(効果値:180)", turn: 5, proc: [ss_damage_s(1.8, [1, 0], 5)], }, as2: { desc: "3チェインで敵単体を3回連続攻撃(効果値:350)", proc: ChainDualAttack(4.5, 3, 3), }, ss2: { desc: "敵単体へ水・火属性の5回連続ダメージ(効果値:380)", turn: 8, proc: [ss_damage_s(3.8, [1, 0], 5)], }, },
	// glico gacha
	{ name: "時忘れの新感覚 ユッカ", cardno: 4347, imageno: 6103, hp: 3494, atk: 2212, cost: 48, islegend: true, attr: [1, -1], species: [9], awakes: [Panel_boost([0, 1, 0], 1), Fastskill(1), Spec_statusup(200, 0, [9]), Attr_statusup(0, 100, [0, 1, 0]), Panel_boost([0, 1, 0], 1), NEFTJOD(30), Attr_statusup(100, 0, [0, 1, 0]), Spec_statusup(0, 200, [9]), Panel_boost([0, 1, 0], 1), Fastskill(2), ], Lawake: [Statusup(500, 0), Statusup(0, 500), ], as1: { desc: "5チェインで水属性の味方の攻撃力をアップ(効果値: 60)", proc: ChainEnhance(0.6, [0, 1, 0], 5), }, ss1: { desc: "ジャンルパネルにチェインがプラス1の効果を付与", turn: 3, proc: [panel_chainplus(1)], }, as2: { desc: "5チェインで水属性の味方の攻撃力をアップ(効果値: 90)", proc: ChainEnhance(0.9, [0, 1, 0], 5), }, ss2: { desc: "ジャンルパネルにチェインがプラス2の効果を付与", turn: 5, proc: [panel_chainplus(2)], }, },
	// 35m download
    {name: "双星、芽生えたココロ アイ&アイ",cardno: 4432,imageno: 6126,hp: 2328,atk: 2432,cost: 48,islegend: true,attr: [2, 0],species: [6],awakes: [Fastskill(1),Attr_statusup(100, 0, [1, 0, 1]),Panel_boost([0, 0, 1], 1),Spec_statusup(200, 0, [6]),Spec_statusup(200, 0, [6]),Attr_statusup(0, 100, [1, 0, 1]),Panel_boost([0, 0, 1], 1),Spec_statusup(0, 200, [6]),Spec_statusup(0, 200, [6]),Fastskill(2),],Lawake: [Statusup(500, 0),Attr_statusup(0, 100, [1, 0, 1]),],as1: {desc: "5チェインでダメージアップ(効果値:350)",proc: ChainAttack(4.5, 5),},ss1: {desc: "ジャンルパネルにチェインがプラス2の効果を付与",turn: 5,proc: [panel_chainplus(2)],},as2: {desc: "5チェインでMAXHP15%を使い、ダメージアップ(効果値:550)",proc: add_cond(ChainAttack(6.5, 5), {after: ConsumeHP_own(0.15),	}),},ss2: {desc: "ジャンルパネルにチェインがプラス3の効果を付与",turn: 8,proc: [panel_chainplus(3)],},},
    {name: "覇眼戦線 リヴェータ&ルドヴィカ",cardno: 4434,imageno: 6128,hp: 2283,atk: 2575,cost: 52,islegend: true,attr: [0, 1],species: [8],awakes: [Attr_statusup(100, 0, [1, 1, 0]),Panel_boost([1, 0, 0], 1),Statusup(0, 200),Attr_statusup(0, 100, [1, 1, 0]),Fastskill(1),Statusup(200, 0),NEFTJOD(30),Spec_statusup(0, 200, [8]),Spec_statusup(200, 0, [8]),Fastskill(2),],Lawake: [Attr_statusup(0, 100, [1, 1, 0]),Statusup(500, 0),],as1: {desc: "3チェインでダメージアップ(効果値:250)、リーダー時さらにアップ(効果値:50)",proc: multi_as(ChainAttack(3.5, 3), add_cond(ChainAttack(4, 3), {cond: when_leader()})),},ss1: {desc: "敵単体へ水・火属性の5回連続ダメージ(効果値:180)",turn: 5,proc: [ss_damage_s(1.8, [0, 1], 5)],},as2: {desc: "3チェインでダメージアップ(効果値:350)、リーダー時さらにアップ(効果値:50)",proc: multi_as(ChainAttack(4.5, 3), add_cond(ChainAttack(5, 3), {cond: when_leader()})),},ss2: {desc: "敵単体へ水・火属性の5回連続ダメージ(効果値:380)",turn: 8,proc: [ss_damage_s(3.8, [0, 1], 5)],},},
    {name: "心繋がる星の夜に ソラナ&ヒカリ",cardno: 4436,imageno: 6130,hp: 3117,atk: 2087,cost: 50,islegend: true,attr: [1, 2],species: [9],awakes: [Panel_boost([0, 1, 0], 1),Fastskill(1),Attr_statusup(100, 0, [0, 1, 1]),Statusup(200,0),Heal_afterbattle(10),Attr_statusup(0, 100, [0, 1, 1]),Panel_boost([0, 1, 0], 1),Fastskill(2),Spec_statusup(200, 0, [9]),Spec_statusup(0, 200, [9]),],Lawake: [Attr_statusup(0, 100, [0, 1, 1]),Statusup(500, 0),],as1: {desc: "6チェインで水・雷属性の味方の攻撃力をアップ(効果値:70)",proc: ChainEnhance(0.7, [0,1,1], 6),},ss1: {desc: "3ターンの間、スキルカウンター待機",turn: 7,proc: null,},as1: {desc: "6チェインで水・雷属性の味方の攻撃力をアップ(効果値:100)",proc: ChainEnhance(1.0, [0,1,1], 6),},ss2: {desc: "5ターンの間、スキルカウンター待機",turn: 10,proc: null,},},
    {name: "死界の焔 ヴィヴィ&イザヴェリ",cardno: 4438,imageno: 6132,hp: 3468,atk: 2554,cost: 46,islegend: true,attr: [0, -1],species: [2],awakes: [Attr_statusup(100, 0, [1, 0, 0]),Fastskill(1),Panel_boost([1, 0, 0], 1),Attr_statusup(0, 100, [1, 1, 0]),Spec_statusup(0, 200, [2, 9]),Panel_boost([1, 0, 0], 1),Spec_statusup(200, 0, [2, 9]),Fastskill(2),Spec_statusup(0, 200, [2, 9]),Spec_statusup(200, 0, [2, 9]),],Lawake: [Attr_statusup(0, 100, [1, 0, 0]),Statusup(500, 0),],as1: {desc: "味方のMAXHP10%を使い、火属性の味方の攻撃力をアップ(効果値:50)",proc: add_cond(ChainEnhance(0.5, [1, 0, 0], 0), {after: ConsumeHP_all(0.1)}),},ss1: {desc: "MAXHPの50%を使い敵全体へダメージ(効果値:260)",turn: 7,proc: [consume_own(0.5), ss_damage_all(2.6, [0])],},as2: {desc: "味方のMAXHP10%を使い、火属性の味方の攻撃力をアップ(効果値:70)",proc: add_cond(ChainEnhance(0.7, [1, 0, 0], 0), {after: ConsumeHP_all(0.1)}),},ss2: {desc: "MAXHPの50%を使い敵全体へダメージ(効果値:330)",turn: 9,proc: [consume_own(0.5), ss_damage_all(3.3, [0])],},},
    {name: "私たち、超無敵の ソフィ&リルム",cardno: 4440,imageno: 6134,hp: 2203,atk: 2507,cost: 47,islegend: true,attr: [1, 0],species: [9],awakes: [Fastskill(1),Statusup(0, 200),Panel_boost([0, 1, 0], 1),Attr_statusup(0, 100, [1, 1, 0]),NEFTJOD(30),Panel_boost([0, 1, 0], 1),Fastskill(2),Attr_statusup(100, 0, [1, 1, 0]),Spec_statusup(0, 200, [9]),Spec_statusup(200, 0, [9]),],Lawake: [Statusup(0, 500),Statusup(500, 0),],as1: {desc: "4チェインでダメージアップ(効果値:300)",proc: ChainAttack(4, 4),},ss1: {desc: "敵全体へ水・火属性のダメージ(効果値:150)",turn: 7,proc: [ss_damage_all(1.5, [1, 0])],},as2: {desc: "4チェインでダメージアップ(効果値:400)",proc: ChainAttack(5, 4),},ss2: {desc: "敵全体へ水・火属性のダメージ(効果値:220)",turn: 10,proc: [ss_damage_all(2.2, [1, 0])],},},

];