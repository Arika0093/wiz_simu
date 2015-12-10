// -------------------------
// 精霊データ
// -------------------------
Cards = [
	// No. -1: サンプルデータ ----------------
	{
		// 名前
		name: "デバッグ用元帥",
		// 図鑑番号
		cardno: -1,
		// 画像読み込み用番号
		imageno: 3836,
		// LvMaxの時のHP
		hp: 10000,
		// LvMaxの時の攻撃力
		atk: 10000,
		// コスト
		cost: 0,
		// L精霊かどうか
		islegend: false,
		// 属性(0: fire, 1: water, 2: thunder, 3: light, 4: dark, -1: none)
		attr: [2,-1],
		// 種族(0: 龍族, 1: 神族, 2: 魔族, 3: 天使, 4: 妖精, 5: 亜人, 
		//     6: 物質, 7: 魔法生物, 8: 戦士, 9: 術士, 10: アイテム, 11: AbCd)
		species: [8],
		// 潜在能力
		awakes: [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
		],
		// アンサースキル1
		as1: {
			// 説明
			desc: "3チェインで敵全体へダメージ(効果値: 1000)",
			// 内容
			func: function () {
				return ChainAllAttack(10.0, 3);
			},
		},
		// スペシャルスキル1
		ss1: {
			// 説明
			desc: "味方全体のスペシャルスキルの発動ターンを2早める",
			turn: 3,
			// 内容
			func: function () {

			}
		},
	},
	// ---------------------------------
	{
		name: "牡丹微睡む夕月夜 ミコト・ウタヨミ",
		cardno: 6801,
		imageno: 6801,
		hp: 2241,
		atk: 3834,
		cost: 46,
		islegend: true,
		attr: [2, 1],
		species: [1],
		awakes: [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
		],
		Lawake: [
			{},
			{},
		],
		as1: {
			desc: "5チェインで敵単体を3回連続攻撃(効果値: 350)",
			func: function () {
				return ChainDualAttack(4.5, 5, 3);
			}
		},
		ss1: {
			desc: "敵全体へ雷属性のダメージ(効果値: 200)、さらに水属性の敵には特攻ダメージ(効果値: 300)",
			turn: 6,
			func: function () {
				return null;
			}
		},
		as2: {
			desc: "5チェインで敵単体を3回連続攻撃(効果値: 450)",
			func: function () {
				return ChainDualAttack(5.5, 5, 3);
			}
		},
		ss2: {
			desc: "敵全体へ雷属性のダメージ(効果値: 200)、さらに水属性の敵には特攻ダメージ(効果値: 700)",
			turn: 9,
			func: function () {
				return null;
			}
		},
	},
	// ---------------------------------




]
