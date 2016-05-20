﻿// -------------------------
// クエストデータ
//	敵行動: turn->現在の待機ターン / wait->行動後の待機ターン
// -------------------------
Quests = [
	// -------------------------
	// トーナメント: 伍式
	// -------------------------
	{
		id: "grade15",
		name: "伍式(トーナメント15段)",
		category: "tornament",
		desc: "火推奨のトーナメントです。1位入賞時4800pt。",
		overlap: false,
		aprnum: 5,
		data: [{
			appearance: [1],
			enemy: [{
				name: "覗かれる者の黄金の視線",
				hp: 15,
				imageno: 7160,
				attr: 2,
				spec: 6,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_attack(250, 5, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "花咲ける森の王 ビッグカリフー",
				hp: 25000,
				imageno: 7172,
				attr: 2,
				spec: 5,
				move: {
					on_popup: [
						damage_block_own(10000, 4),
					],
					on_move: [
						s_enemy_attack(200, 5, 1, true)
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [2],
			enemy: [{
				name: "凶暴な閃翼魔のレリーフ",
				hp: 25000,
				imageno: 7166,
				attr: 2,
				spec: 2,
				move: {
					on_move: [
						m_enemy_once(s_enemy_chain_sealed(3)),
						s_enemy_attack(100, 5, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 2,
				},
			}, {
				name: "肥沃な土地の魔草 プラティー",
				hp: 30000,
				imageno: 7184,
				attr: 2,
				spec: 7,
				move: {
					on_popup: [
						skill_counter_func(attack_counter_dual, "多段式カウンター(500)", -1, false, 500, 3),
						s_enemy_division(),
					],
					on_move: [
						s_enemy_attack(250, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, {
				name: "凶暴な炎翼魔のレリーフ",
				hp: 20000,
				imageno: 7162,
				attr: 0,
				spec: 2,
				move: {
					on_move: [
						m_enemy_once(s_enemy_deathlimit(1, 7)),
						s_enemy_attack(100, 5, 3, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				}
			}, ],
		}, {
			appearance: [3],
			enemy: [{
				name: "橙色の灯火 シャンデリッパー",
				hp: 25000,
				imageno: 7177,
				attr: 2,
				spec: 6,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_attr_weaken, "雷属性弱体化(50%)", -1, false, [0, 0, 1, 0, 0], 1.5, 5, 3),
					],
					on_move: [
						s_enemy_attack(250, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, {
				name: "朱に染まる森の王 ビッグカリフー",
				hp: 25000,
				imageno: 7168,
				attr: 0,
				spec: 5,
				move: {
					on_move: [
						m_enemy_once(s_enemy_force_reservoir()),
						m_enemy_once(s_enemy_attack(2000, 5, 1, true)),
						s_enemy_attack(1000, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, {
				name: "花咲ける森の王 ビッグカリフー",
				hp: 30000,
				imageno: 7172,
				attr: 2,
				spec: 5,
				move: {
					on_move: [
						m_enemy_once(s_enemy_force_reservoir()),
						m_enemy_once(s_enemy_attack(2000, 5, 1, true)),
						s_enemy_attack(1000, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [4],
			enemy: [{
				name: "覗かれる者の黄金の視線",
				hp: 20,
				imageno: 7160,
				attr: 2,
				spec: 6,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_attack(150, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "激昂する伝説のスノウフッド",
				hp: 35000,
				imageno: 7186,
				attr: 0,
				spec: 5,
				move: {
					on_move: [
						m_enemy_once(s_enemy_poison(500, 5, 3)),
						s_enemy_attack(200, 5, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "橙色の灯火 シャンデリッパー",
				hp: 30000,
				imageno: 7177,
				attr: 2,
				spec: 6,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_discharge, "ディスチャージ(-2t)", -1, false, 5, 2),
					],
					on_move: [
						s_enemy_attack(300, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [5],
			enemy: [{
				name: "激昂する伝説のスノウフッド",
				hp: 90000,
				imageno: 7186,
				attr: 0,
				spec: 5,
				move: {
					on_popup: [
						s_enemy_ss_sealed(5, 1)
					],
					on_move: [
						m_enemy_once(s_enemy_force_reservoir()),
						m_enemy_once(s_enemy_attack(2000, 1, 1, true)),
						s_enemy_attack(1500, 1, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "儚き友諠の栞 キーラ・バルバレス",
				hp: 400000,
				imageno: 7148,
				attr: 2,
				subattr: 3,
				spec: 9,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_healreverse, "回復反転(50%)", -1, false, 0.5, 5),
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(150, 5, 5, true),
					],
					on_angry: [
						attr_change(3),
						s_enemy_attr_weaken([1,1,1,1,1], 1.25, 5, 2),
					],
					on_move_angry: [
						s_enemy_attack(150, 5, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "遭遇する伝説のスノウフッド",
				hp: 80000,
				imageno: 7190,
				attr: 2,
				spec: 5,
				move: {
					on_popup: [
						attack_counter_dual(700, 3),
					],
					on_move: [
						s_enemy_attack(200, 5, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, ],
	},
	// -------------------------
	// トーナメント: 肆式
	// -------------------------
	{
		id: "grade14",
		name: "肆式(トーナメント14段)",
		category: "tornament",
		desc: "雷推奨のトーナメントです。1位入賞時4200pt。",
		overlap: false,
		aprnum: 5,
		data: [{
			appearance: [1],
			enemy: [{
				name: "スクワルボーン",
				hp: 21000,
				imageno: 5249,
				attr: 1,
				spec: 2,
				move: {
					on_move: [
						s_enemy_chain_sealed(7),
						s_enemy_attack(350, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "リラソハウスバウンサー",
				hp: 9500,
				imageno: 5242,
				attr: 1,
				spec: 5,
				move: {
					on_move: [
						s_enemy_attack(70, 3, 5, true),
						s_enemy_attack(200, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "リラソハウスバウンサー",
				hp: 9500,
				imageno: 5242,
				attr: 1,
				spec: 5,
				move: {
					on_move: [
						s_enemy_attack(70, 3, 5, true),
						s_enemy_attack(200, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [2],
			enemy: [{
				name: "ターコイズレンジャー",
				hp: 75000,
				imageno: 5231,
				attr: 1,
				spec: 0,
				move: {
					on_move: [
						s_enemy_attack(70, 3, 5, true),		// 要検証
						s_enemy_attack(200, 5, 1, false),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "木負いガメ",
				hp: 15,
				imageno: 3743,
				attr: 1,
				spec: 7,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_attack(100, 3, 5, true),
						s_enemy_attack(200, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, {
				name: "リラソハウスバウンサー",
				hp: 36300,
				imageno: 5242,
				attr: 1,
				spec: 5,
				move: {
					on_move: [
						s_enemy_attack(70, 3, 5, true),
						s_enemy_attack(200, 5, 1, false),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				}
			}, ],
		}, {
			appearance: [3],
			enemy: [{
				name: "ターコイズサハギン",
				hp: 58000,
				imageno: 2544,
				attr: 1,
				spec: 5,
				move: {
					on_popup: [
						s_enemy_force_reservoir(),
					],
					on_move: [
						m_enemy_once(s_enemy_attack(500, 5, 1, true)),
						s_enemy_attack(250, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, {
				name: "ターコイズサハギン",
				hp: 29000,
				imageno: 2544,
				attr: 1,
				spec: 5,
				move: {
					on_popup: [
						s_enemy_force_reservoir(),
					],
					on_move: [
						m_enemy_once(s_enemy_attack(500, 5, 1, true)),
						s_enemy_attack(250, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, {
				name: "クリフゴート",
				hp: 36300,
				imageno: 3737,
				attr: 1,
				spec: 5,
				move: {
					on_move: [
						m_enemy_once(damage_block_own(30000, -1)),
						s_enemy_attack(250, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [4],
			enemy: [{
				name: "リラソハウスバウンサー",
				hp: 10000,
				imageno: 5242,
				attr: 1,
				spec: 5,
				move: {
					on_move: [
						s_enemy_attack(250, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "蒼鏡 サーチャー",
				hp: 63000,
				imageno: 3731,
				attr: 1,
				spec: 6,
				move: {
					on_move: [
						m_enemy_once(s_enemy_chain_break()),
						s_enemy_attack(70, 3, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "リラソハウスバウンサー",
				hp: 36300,
				imageno: 5242,
				attr: 1,
				spec: 5,
				move: {
					on_move: [
						s_enemy_attack(250, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [5],
			enemy: [{
				name: "ロレッタ",
				hp: 100000,
				imageno: 5482,
				attr: 1,
				spec: 9,
				move: {
					on_move: [
						m_enemy_once(s_enemy_attr_weaken([0, 1, 0, 0, 0], 1.5, 5, 4)),
						s_enemy_attack(1400, 1, 1),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "ルシェ",
				hp: 600000,
				imageno: 5486,
				attr: 1,
				spec: 0,
				move: {
					on_move: [
						m_enemy_once(s_enemy_poison(500, 5, 5)),
						s_enemy_attack(1400, 1, 1, m_enemy_tgtype_maxhp()),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "ベルナデッタ",
				hp: 100000,
				imageno: 5494,
				attr: 1,
				spec: 9,
				move: {
					on_move: [
						m_enemy_once(s_enemy_as_sealed(5, 4)),
						s_enemy_attack(1400, 1, 1, m_enemy_tgtype_minhp()),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, ],
	},

	// -------------------------
	// トーナメント: 参式
	//   敵行動:. 要検証
	// -------------------------
	{
		id: "grade13",
		name: "参式(トーナメント13段)",
		category: "tornament",
		desc: "水推奨のトーナメントです。1位入賞時3640pt。",
		aprnum: 5,
		overlap: false,
		data: [{
			// 火龍 / 火龍
			appearance: [1, 2],
			enemy: [{
				name: "アッガローグ",
				hp: 35000,
				imageno: 5228,
				attr: 0,
				spec: 0,
			}, {
				name: "アッガローグ",
				hp: 35000,
				imageno: 5228,
				attr: 0,
				spec: 0,
			}, ],
		}, {
			// 水龍 / 火龍
			appearance: [1, 2],
			enemy: [{
				name: "水甲ウォーターリザード",
				hp: 21000,
				imageno: 5254,
				attr: 1,
				spec: 0,
			}, {
				name: "アッガローグ",
				hp: 35000,
				imageno: 5228,
				attr: 0,
				spec: 0,
			}, ],
		}, {
			// 水魔族 / 雷魔族 / 火亜人
			appearance: [3],
			enemy: [{
				name: "ボーンソルジャー・フリーズ",
				hp: 24000,
				imageno: 5248,
				attr: 1,
				spec: 2,
				move: {
					on_move: [
						s_enemy_attack(175, 1, 1)
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				}
			}, {
				name: "ボーンソルジャー・チャード",
				hp: 16000,
				imageno: 5250,
				attr: 2,
				spec: 2,
				move: {
					on_move: [
						s_enemy_attack(250, 1, 1)
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				}
			}, {
				name: "アクトハウスバウンサー",
				hp: 100000,
				imageno: 5240,
				attr: 0,
				spec: 5,
				move: {
					on_popup: [
						attack_counter(2000, -1),
					],
					on_move: [
						s_enemy_attack(700, 1, 1)
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				}
			}, ],
		}, {
			// 火魔法生物
			appearance: [4],
			enemy: [{
				name: "杓岩のラーヴァスピリット",
				hp: 25,
				imageno: 5259,
				attr: 0,
				spec: 7,
				move: {
					on_popup: [
						impregnable(-1),
					]
				}
			}, ],
		}, {
			// (ボス)火魔法生物 / ティア
			appearance: [5],
			enemy: [{
				name: "杓岩のラーヴァスピリット",
				hp: 100000,
				imageno: 5259,
				attr: 0,
				spec: 7,
				move: {
					on_popup: [
						damage_block_own(9000, -1),
					]
				}
			}, {
				name: "ティア",
				imageno: 5223,
				hp: 360000,
				attr: 0,
				spec: 9,
				move: {
					on_popup: [
						skill_counter(9999, -1),
						damage_switch(s_enemy_when_hpdown(0.5), m_enemy_angry()),
					],
					on_move: [
						s_enemy_attack(1300, 1, 2, true)
					],
					on_angry: [
						attr_change(1),
					],
					on_move_angry: [
						// 要: 攻撃属性の検証
						s_enemy_attack(325, 4, 4, true)
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				}
			}, ],
		}, ],
	},

	// -------------------------
	// トーナメント: 弐式
	//   敵行動:. 要検証
	// -------------------------
	{
		id: "grade12",
		name: "弐式(トーナメント12段)",
		category: "tornament",
		desc: "火推奨のトーナメントです。1位入賞時2600pt。入賞確実: 5-6t / タイム勝負: 7t-",
		aprnum: 5,
		overlap: false,
		data: [{
			// 雷牛 / 火タービン
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "黄毛クリフゴート",
				hp: 19800,
				imageno: 3738,
				attr: 2,
				spec: 7,
			}, {
				name: "紅鏡サーチャー",
				hp: 13200,
				imageno: 3728,
				attr: 0,
				spec: 6,
			}, ],
		}, {
			// 雷タービン / 火カーバンクル
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "黄鏡サーチャー",
				hp: 19800,
				imageno: 3732,
				attr: 2,
				spec: 6,
			}, {
				name: "柘榴フライングカーバンクル",
				hp: 13200,
				imageno: 3746,
				attr: 0,
				spec: 4,
			}, ],
		}, {
			// 雷カーバンクル / 水タービン
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "黄晶フライングカーバンクル",
				hp: 19800,
				imageno: 3750,
				attr: 2,
				spec: 4,
			}, {
				name: "水鏡サーチャー",
				hp: 6600,
				imageno: 3730,
				attr: 1,
				spec: 6,
			}, ],
		}, {
			// 雷タービン / 雷カーバンクル
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "黄鏡サーチャー",
				hp: 19800,
				imageno: 3732,
				attr: 2,
				spec: 6,
			}, {
				name: "黄晶フライングカーバンクル",
				hp: 19800,
				imageno: 3750,
				attr: 2,
				spec: 4,
			}, ],
		}, {
			// 火タービン / 火タービン
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "紅鏡サーチャー",
				hp: 13200,
				imageno: 3728,
				attr: 0,
				spec: 6,
			}, {
				name: "紅鏡サーチャー",
				hp: 13200,
				imageno: 3728,
				attr: 0,
				spec: 6,
			}, ],
		}, {
			// 雷牛 / 水牛
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "黄毛クリフゴート",
				hp: 19800,
				imageno: 3738,
				attr: 2,
				spec: 7,
			}, {
				name: "青冠クリフゴート",
				hp: 6600,
				imageno: 3736,
				attr: 1,
				spec: 7,
			}, ],
		}, {
			// (ボス)火タービン / オルネ / 水カーバンクル
			appearance: [5],
			enemy: [{
				name: "焔嵐タービネックス",
				imageno: 3723,
				hp: 35000,
				attr: 0,
				spec: 6,
				move: {
					on_popup: [
						skill_counter(9999, -1),
					],
				}
			}, {
				name: "オルネ",
				imageno: 4091,
				hp: 120000,
				attr: 2,
				spec: 9,
			}, {
				name: "蒼玉フライングカーバンクル",
				imageno: 3749,
				hp: 25000,
				attr: 1,
				spec: 7,
				move: {
					on_move: [
						s_enemy_ss_sealed(5, 2),
						null,
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, ],
		}, ],
	},

	// -------------------------
	// トーナメント: 壱式
	//   敵行動:. 要検証
	// -------------------------
	{
		id: "grade11",
		name: "壱式(トーナメント11段)",
		category: "tornament",
		desc: "雷推奨のトーナメントです。1位入賞時2500pt。",
		aprnum: 5,
		overlap: false,
		data: [{
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "燐光の骨狼",
				hp: 18000,
				imageno: 2527,
				attr: 2,
				spec: 7,
			}, ],
		}, {
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "氷雨の骨狼",
				hp: 30000,
				imageno: 2525,
				attr: 1,
				spec: 7,
			}, ],
		}, {
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "ブルーサハギン",
				hp: 17000,
				imageno: 2543,
				attr: 1,
				spec: 5,
			}, {
				name: "濁流のコカトリス",
				hp: 17000,
				imageno: 2537,
				attr: 1,
				spec: 2,
			},

			],
		}, {
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "氷毒のキラービー",
				hp: 17000,
				imageno: 2549,
				attr: 1,
				spec: 7,
			}, {
				name: "帯電するコカトリス",
				hp: 9000,
				imageno: 2539,
				attr: 2,
				spec: 2,
			},

			],
		}, {
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "イエローハーピー",
				hp: 9000,
				imageno: 2533,
				attr: 2,
				spec: 5,
			}, {
				name: "火吹きのコカトリス",
				hp: 8000,
				imageno: 2535,
				attr: 0,
				spec: 2,
			},

			],
		}, {
			appearance: [1, 2, 3, 4],
			enemy: [{
				name: "ブルーサハギン",
				hp: 17000,
				imageno: 2543,
				attr: 1,
				spec: 5,
			}, {
				name: "レッドハーピー",
				hp: 8000,
				imageno: 2529,
				attr: 0,
				spec: 5,
			},

			],
		}, {
			appearance: [5],
			enemy: [{
				name: "プラズマファントム",
				hp: 20000,
				imageno: 2522,
				attr: 2,
				spec: 2,
				move: {
					on_popup: [
						attack_counter(9999, -1),
					],
				},
			}, {
				name: "ベルナデッタ",
				hp: 200000,
				imageno: 2556,
				attr: 1,
				spec: 9,
				move: {
					on_move: [
						s_enemy_attack(1300, 1, 1),
						s_enemy_heal_all(0.25),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, ],
		}, ],
	},
        // -------------------------
	// (2016/05)イベントトーナメント 覇級
	// -------------------------
	{
		id: "1605ev_h",
		name: "(2016/05)イベントトーナメント 覇級",
		category: "event tornament",
		overlap: false,
		aprnum: 5,
		data: [{
			appearance: [1],
			enemy: [{
				name: "魔界乙女の熱情のしずく",
				hp: 30000,
				imageno: 8053,
				attr: 0,
				spec: 2,
				move: {
					on_move: [
						s_enemy_attack(110, 3, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 2,
				},
			}, {
				name: "痺れる月に吠える魔狼少女",
				hp: 50000,
				imageno: 8067,
				attr: 2,
				spec: 2,
				move: {
					on_move: [
						s_enemy_attack(250, 3, 3, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "稲妻の魔狼少女",
				hp: 15000,
				imageno: 8066,
				attr: 4,
				spec: 2,
				move: {
					on_move: [
						s_enemy_attack(220, 3, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 2,
				},
			}, ],
		}, {
			appearance: [2],
			enemy: [{
				name: "魔界乙女のデンゲキのしずく",
				hp: 175000,
				imageno: 8057,
				attr: 2,
				spec: 2,
				move: {
					on_move: [
						m_enemy_once(s_enemy_chain_break()),
						s_enemy_attack(250, 3, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "魔界乙女のデンゲキのしずく",
				hp: 180000,
				imageno: 8057,
				attr: 2,
				spec: 2,
				move: {
					on_move: [
						m_enemy_once(s_enemy_chain_sealed(3)),
						s_enemy_attack(250, 3, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "魔界乙女の熱情のしずく",
				hp: 13500,
				imageno: 8053,
				attr: 0,
				spec: 2,
				move: {
					on_popup: [
						skill_counter(11000, -1),
					],
					on_move: [
						s_enemy_attack(100, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 2,
				},
			}, ],
		}, {
			appearance: [3],
			enemy: [{
				name: "魔界乙女の熱情のしずく",
				hp: 22000,
				imageno: 8053,
				attr: 0,
				spec: 2,
				move: {
					on_move: [
						s_enemy_attack(100, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "痺れる月に吠える魔狼少女",
				hp: 115000,
				imageno: 8067,
				attr: 2,
				spec: 2,
				move: {
					on_move: [
						m_enemy_once(s_enemy_as_sealed(5, 3)),
						s_enemy_attack(250, 3, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "稲妻の魔狼少女",
				hp: 63000,
				imageno: 8066,
				attr: 2,
				spec: 2,
				move: {
					on_move: [
						s_enemy_attack(400, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [4],
			enemy: [{
				name: "しびれるデーモンゼリー",
				hp: 100000,
				imageno: 8056,
				attr: 2,
				spec: 2,
				move: {
					on_move: [
						m_enemy_once(s_enemy_chain_break()),
						s_enemy_attack(250, 3, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "魔界乙女のデンゲキのしずく",
				hp: 170000,
				imageno: 8057,
				attr: 2,
				spec: 2,
				move: {
					on_move: [
						m_enemy_once(s_enemy_chain_sealed(3)),
						s_enemy_attack(250, 3, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "魔界乙女の熱情のしずく",
				hp: 40000,
				imageno: 8053,
				attr: 0,
				spec: 2,
				move: {
					on_move: [
						m_enemy_once(s_enemy_ss_sealed(5, 3)),
						s_enemy_attack(150, 3, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 2,
				},
			}, ],
		}, {
			appearance: [5],
			enemy: [{
				name: "痺れる月に吠える魔狼少女",
				hp: 150000,
				imageno: 8067,
				attr: 2,
				spec: 2,
				move: {
					on_move: [
						m_enemy_once(s_enemy_all_sealed(5, 1)),
						s_enemy_attack(150, 3, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "たゆたいの幽姫 コレル・シュケル",
				hp: 190000,
				imageno: 8048,
				attr: 2,,
				spec: 2,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_all_sealed, "全体封印(10T)", -1, false, 5, 10),
						damage_switch(s_enemy_when_dead_l(), m_enemy_angry(), true)
					],
					on_move: [
						s_enemy_attack(150, 3, 3, true),
					],
					on_angry: [
						attack_counter_dual(1000, 5)
					],
					on_move_angry: [
						m_enemy_once(s_enemy_attrguard_own([1,0,0,0,0], 0.5, 10)),
						s_enemy_attack(150, 3, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "魔界乙女のデンゲキのしずく",
				hp: 130000,
				imageno: 8057,
				attr: 2,
				spec: 2,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_cursed, "のろい(-5000)", -1, false, 5000, 5, 10),
					],
					on_move: [
						s_enemy_attack(150, 3, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, ],
	},
	// -------------------------
	// (2016/04)イベントトーナメント 覇級
	// -------------------------
	{
		id: "1604ev_h",
		name: "(2016/04)イベントトーナメント 覇級",
		category: "past event",
		overlap: false,
		aprnum: 5,
		data: [{
			appearance: [1],
			enemy: [{
				name: "火:戦士",
				hp: 20000,
				imageno: 7911,
				attr: 0,
				spec: 8,
				move: {
					on_move: [
						s_enemy_attack(300, 3, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 2,
				},
			}, {
				name: "火:戦士",
				hp: 20000,
				imageno: 7912,
				attr: 0,
				spec: 8,
				move: {
					on_move: [
						s_enemy_chain_sealed(5),
						s_enemy_attack(1100, 5, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [2],
			enemy: [{
				name: "火:戦士",
				hp: 20000,
				imageno: 7911,
				attr: 0,
				spec: 8,
				move: {
					on_move: [
						s_enemy_attack(300, 3, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "火:戦士",
				hp: 30000,
				imageno: 7912,
				attr: 0,
				spec: 8,
				move: {
					on_move: [
						s_enemy_chain_sealed(5),
						s_enemy_attack(1100, 5, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "火:戦士",
				hp: 50000,
				imageno: 7920,
				attr: 0,
				spec: 8,
				move: {
					on_move: [
						s_enemy_attack(300, 3, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [3],
			enemy: [{
				name: "火:戦士",
				hp: 40000,
				imageno: 7919,
				attr: 0,
				spec: 8,
				move: {
					on_popup: [
						s_enemy_deathlimit(5, 4),
					],
					on_move: [
						s_enemy_attack(1100, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "雷:戦士",
				hp: 25000,
				imageno: 7924,
				attr: 2,
				spec: 8,
				move: {
					on_popup: [
						skill_counter_func(damage_block_own, "ダメブロ単体(15000)", -1, false, 15000, 4),
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(1100 / 3, 1, 2, true),
					],
					on_angry: [
						s_enemy_discharge(5, 2),
					],
					on_move_angry: [
						s_enemy_attack(1000 / 3, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "火:戦士(鉄壁)",
				hp: 15,
				imageno: 7919,
				attr: 0,
				spec: 8,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_attack(1200, 5, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, ],
		}, {
			appearance: [4],
			enemy: [{
				name: "水:戦士",
				hp: 30000,
				imageno: 7921,
				attr: 1,
				spec: 8,
				move: {
					on_move: [
						m_enemy_once(attack_counter_dual(700, 3)),
						s_enemy_attack(1000 / 1.5, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "火:戦士",
				hp: 100000,
				imageno: 7920,
				attr: 0,
				spec: 8,
				move: {
					on_popup: [
						s_enemy_ss_sealed(5, 1),
					],
					on_move: [
						//null, // パネルシャッフル
						s_enemy_attack(250, 3, 5, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "火:戦士",
				hp: 40000,
				imageno: 7919,
				attr: 0,
				spec: 8,
				move: {
					on_popup: [
						skill_counter_func(attack_counter_dual, "多段式カウンター(900)", -1, false, 900, 6),
					],
					on_move: [
						s_enemy_attack(300, 3, 5, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [5],
			enemy: [{
				name: "水:戦士(鉄壁)",
				hp: 15,
				imageno: 7922,
				attr: 1,
				spec: 8,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_chain_break(),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "火:戦士",
				hp: 220000,
				imageno: 7910,
				attr: 0,
				subattr: 1,
				spec: 8,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_ss_sealed, "全体SP封印(3T)", -1, false, 5, 3),
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(400, 5, 5, true),
					],
					on_angry: [
						s_enemy_chain_sealed(6),
					],
					on_move_angry: [
						m_enemy_once(s_enemy_attr_weaken([1, 1, 1, 1, 1], 1.5, 5, 2)),
						s_enemy_attack(400 / 1.5, 5, 5, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "火:戦士",
				hp: 100000,
				imageno: 7919,
				attr: 0,
				spec: 8,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_discharge, "スキルディスチャージ(2T)", -1, false, 5, 2),
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(300, 3, 5, true),
					],
					on_angry: [
						attack_counter_dual(500, 3),
					],
					on_move_angry: [
						s_enemy_attack(300, 3, 5, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, ],
		}, ],
	},
	// -------------------------
	// (2016/04)イベントトーナメント 邪眼級
	// -------------------------
	{
		id: "1604ev_z",
		name: "(2016/04)イベントトーナメント 邪眼級",
		category: "past event",
		overlap: false,
		aprnum: 5,
		data: [{
			appearance: [1],
			enemy: [{
				name: "雷:戦士",
				hp: 20000,
				imageno: 7924,
				attr: 2,
				spec: 8,
				move: {
					on_move: [
						s_enemy_attack(800, 5, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "雷:戦士",
				hp: 35000,
				imageno: 7924,
				attr: 2,
				spec: 8,
				move: {
					on_move: [
						s_enemy_attack(650, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [2],
			enemy: [{
				name: "雷:戦士",
				hp: 20000,
				imageno: 7924,
				attr: 2,
				spec: 8,
				move: {
					on_move: [
						m_enemy_once(s_enemy_healreverse(0.25, 5)),
						s_enemy_attack(800, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "雷:戦士",
				hp: 30000,
				imageno: 7924,
				attr: 2,
				spec: 8,
				move: {
					on_move: [
						s_enemy_attack(1000, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [3],
			enemy: [{
				name: "火:戦士",
				hp: 20000,
				imageno: 7920,
				attr: 0,
				spec: 8,
				move: {
					on_popup: [
						s_enemy_healreverse(0.25, 5),
					],
					on_move: [
						s_enemy_attack(1000 / 1.5, 5, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "雷:戦士",
				hp: 40000,
				imageno: 7924,
				attr: 2,
				spec: 8,
				move: {
					on_move: [
						s_enemy_attack(300, 3, 4, true),
					],
					atrandom: false,
					turn: 1,
					wait: 2,
				},
			}, {
				name: "雷:戦士",
				hp: 30000,
				imageno: 7924,
				attr: 2,
				spec: 8,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_healreverse, "回復反転(50%)", -1, false, 0.5, 5),
					],
					on_move: [
						s_enemy_attack(1000, 5, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, ],
		}, {
			appearance: [4],
			enemy: [{
				name: "雷:戦士",
				hp: 40000,
				imageno: 7924,
				attr: 2,
				spec: 8,
				move: {
					on_popup: [
						s_enemy_attrguard_own([1, 0, 0, 0, 0], 0.5, 3),
						s_enemy_division(0.5),
					],
					on_move: [
						m_enemy_once(s_enemy_attr_weaken([1, 1, 1, 0, 0], 1.25, 5, 4)),
						s_enemy_attack(300, 3, 4, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "雷:戦士",
				hp: 50000,
				imageno: 7920,
				attr: 2,
				spec: 8,
				move: {
					on_popup: [
						s_enemy_poison(1000, 5, 1),
					],
					on_move: [
						s_enemy_attack(300, 3, 3, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "雷:戦士",
				hp: 40000,
				imageno: 7924,
				attr: 2,
				spec: 8,
				move: {
					on_move: [
						s_enemy_attack(300, 3, 4, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [5],
			enemy: [{
				name: "水:戦士",
				hp: 35000,
				imageno: 7913,
				attr: 1,
				spec: 8,
				move: {
					on_move: [
						m_enemy_once(s_enemy_attack_attrsp(2000, 1000 / 3, 1, 5, 1, false)),
						s_enemy_attack(1000 / 3, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "雷:戦士",
				hp: 130000,
				imageno: 7907,
				attr: 2,
				spec: 8,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_as_sealed, "全体AS封印(6T)", -1, false, 5, 6),
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(500, 3, 4, true),
					],
					on_angry: [
						s_enemy_healreverse(0.5, 5),
					],
					on_move_angry: [
						s_enemy_attack(400, 5, 4, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "雷:戦士",
				hp: 90000,
				imageno: 7924,
				attr: 2,
				spec: 8,
				move: {
					on_popup: [
						s_enemy_attack_ratio(0.3, 5, false),
					],
					on_move: [
						m_enemy_once(s_enemy_heal_all(0.25)),
						s_enemy_attack(300, 3, 4, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, ],
		}, ],
	},
	// -------------------------
	// (2016/03)イベントトーナメント: 覇級
	// -------------------------
	{
		id: "1603ev_h",
		name: "(2016/03)イベントトーナメント 覇級",
		category: "past event",
		desc: "2016/03に開催された魔道杯のイベントトーナメント覇級です。",
		overlap: false,
		aprnum: 5,
		data: [{
			appearance: [1],
			enemy: [{
				name: "花咲ける森の王 ビッグカリフー",
				hp: 15000,
				imageno: 7831,
				attr: 3,
				spec: 5,
				move: {
					on_move: [
						m_enemy_once(s_enemy_chain_sealed(3)),
						s_enemy_attack(500, 5, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "花咲ける森の王 ビッグカリフー",
				hp: 30000,
				imageno: 7831,
				attr: 3,
				spec: 5,
				move: {
					on_move: [
						s_enemy_attack(200, 5, 3, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [2],
			enemy: [{
				name: "肥えた大地の魔草 プラティー",
				hp: 25000,
				imageno: 7183,
				attr: 2,
				spec: 7,
				move: {
					on_move: [
						m_enemy_once(s_enemy_attrguard_all([1, 1, 1, 0, 0], 0.5, 4)),
						s_enemy_attack(300, 5, 3, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "花咲ける森の王 ビッグカリフー",
				hp: 25000,
				imageno: 7831,
				attr: 3,
				spec: 5,
				move: {
					on_popup: [
						attack_counter_dual(500, 4)
					],
					on_move: [
						s_enemy_attack(300, 5, 3, true)
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, ],
		}, {
			appearance: [3],
			enemy: [{
				name: "肥えた大地の魔草 プラティー",
				hp: 10,
				imageno: 7183,
				attr: 2,
				spec: 7,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_attack(300, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, {
				name: "花咲ける森の王 ビッグカリフー",
				hp: 25000,
				imageno: 7831,
				attr: 3,
				spec: 5,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_attack, "全体400の5連撃", -1, false, 200, 5, 5),
					],
					on_move: [
						s_enemy_attack(500, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, {
				name: "肥えた大地の魔草 プラティー",
				hp: 10,
				imageno: 7183,
				attr: 2,
				spec: 7,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_attack(300, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, ],
		}, {
			appearance: [4],
			enemy: [{
				name: "肥えた大地の魔草 プラティー",
				hp: 60000,
				imageno: 7183,
				attr: 2,
				spec: 7,
				move: {
					on_popup: [
						s_enemy_force_reservoir(),
					],
					on_move: [
						m_enemy_once(s_enemy_attack(3000, 5, 1, true)),
						s_enemy_attack(1500, 5, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "遭遇する伝説のスノウフッド",
				hp: 120000,
				imageno: 7190,
				attr: 2,
				spec: 5,
				move: {
					on_popup: [
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(300, 5, 3, true),
						s_enemy_attack(600, 5, 1, true),
					],
					on_angry: [
						attr_change(3),
					],
					on_move_angry: [
						s_enemy_attack(400, 5, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "肥えた大地の魔草 プラティー",
				hp: 60000,
				imageno: 7183,
				attr: 2,
				spec: 7,
				move: {
					on_move: [
						s_enemy_force_reservoir(),
						s_enemy_attack(3000, 5, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, ],
		}, {
			appearance: [5],
			enemy: [{
				name: "肥えた大地の魔草 プラティー",
				hp: 15,
				imageno: 7183,
				attr: 2,
				spec: 7,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_attack(300, 1, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "遭遇する伝説のスノウフッド",
				hp: 150000,
				imageno: 7830,
				attr: 3,
				spec: 5,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_deathlimit, "死の秒針(3T)", -1, false, 5, 3),
						damage_switch(s_enemy_when_dead_l(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(350, 5, 3, true),
					],
					on_angry: [
						s_enemy_attack_ratio(0.9, 5, false),
					],
					on_move_angry: [
						s_enemy_attack(350, 5, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "花咲ける森の王 ビッグカリフー",
				hp: 30000,
				imageno: 7831,
				attr: 3,
				spec: 5,
				move: {
					on_move: [
						m_enemy_once(s_enemy_healreverse(0.5, 2)),
						s_enemy_attack(200, 5, 3, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, ],
		}, ],
	},
	// -------------------------
	// (2016/03)イベントトーナメント: 絶級
	// -------------------------
	{
		id: "1603ev_z",
		name: "(2016/03)イベントトーナメント 絶級",
		category: "past event",
		desc: "2016/03に開催された魔道杯のイベントトーナメント絶級です。",
		overlap: false,
		aprnum: 5,
		data: [{
			appearance: [1],
			enemy: [{
				name: "赤い灯火 シャンデリッパー",
				hp: 45000,
				imageno: 7173,
				attr: 0,
				spec: 6,
				move: {
					on_move: [
						s_enemy_attack(300, 5, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "青い灯火 シャンデリッパー",
				hp: 37500,
				imageno: 7175,
				attr: 1,
				spec: 6,
				move: {
					on_move: [
						m_enemy_once(s_enemy_attr_weaken([0, 1, 0, 0, 0], 1.5, 5, 4)),
						s_enemy_attack(200, 5, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [2],
			enemy: [{
				name: "赤い灯火 シャンデリッパー",
				hp: 45000,
				imageno: 7173,
				attr: 0,
				spec: 6,
				move: {
					on_popup: [
						s_enemy_healreverse(0.5, 5)
					],
					on_move: [
						s_enemy_attack(300, 5, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "血に染まる本 ザップテイル",
				hp: 30000,
				imageno: 7149,
				attr: 0,
				spec: 6,
				move: {
					on_move: [
						s_enemy_attack(500, 5, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [3],
			enemy: [{
				name: "赤い灯火 シャンデリッパー",
				hp: 52500,
				imageno: 7173,
				attr: 0,
				spec: 6,
				move: {
					on_move: [
						s_enemy_attack(500, 1, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "赤い灯火 シャンデリッパー",
				hp: 52500,
				imageno: 7173,
				attr: 0,
				spec: 6,
				move: {
					on_move: [
						s_enemy_attack(500, 1, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [4],
			enemy: [{
				name: "血に染まる本 ザップテイル",
				hp: 30000,
				imageno: 7149,
				attr: 0,
				spec: 6,
				move: {
					on_popup: [
						s_enemy_healreverse(0.5, 3)
					],
					on_move: [
						s_enemy_attack(300, 5, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "青い灯火 シャンデリッパー",
				hp: 48800,
				imageno: 7175,
				attr: 1,
				spec: 6,
				move: {
					on_popup: [
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(125, 5, 1, true)
					],
					on_move_angry: [
						m_enemy_once(s_enemy_resurrection(0.5)),
						s_enemy_attack(60, 3, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "赤い灯火 シャンデリッパー",
				hp: 45000,
				imageno: 7173,
				attr: 0,
				spec: 6,
				move: {
					on_move: [
						s_enemy_attack(500, 1, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 2,
				},
			}, ],
		}, {
			appearance: [5],
			enemy: [{
				name: "血塗られた物語 ザップテイル",
				hp: 30,
				imageno: 7150,
				attr: 0,
				spec: 6,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_healreverse(0.5, 2),
						s_enemy_attack(350, 1, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "燃え盛る灯火 シャンデリッパー",
				hp: 120000,
				imageno: 7174,
				attr: 0,
				spec: 6,
				move: {
					on_popup: [
						skill_counter_func(damage_block_all, "ダメブロ全体(20000)", -1, false, 20000, 10),
					],
					on_move: [
						s_enemy_attack(160, 5, 5, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "血塗られた物語 ザップテイル",
				hp: 60000,
				imageno: 7150,
				attr: 0,
				spec: 6,
				move: {
					on_move: [
						s_enemy_attrguard_all([0, 1, 0, 0, 0], 0.5, 5),
						s_enemy_healreverse(0.5, 2),
						s_enemy_attack(350, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 2,
				},
			}, ],
		}],
	},
	// -------------------------
	// 過去のイベントトーナメント(2016/02 覇)
	// -------------------------
	{
		id: "1602ev_5",
		name: "(2016/02)イベントトーナメント 覇級",
		category: "past event",
		desc: "2016/02に開催された魔道杯:イベントトーナメントのチャレンジクエストです。",
		overlap: false,
		aprnum: 5,
		data: [{
			appearance: [1],
			enemy: [{
				name: "ハイパービターチューカリー",
				hp: 30000,
				imageno: 7405,
				attr: 4,
				spec: 2,
				move: {
					on_move: [
						m_enemy_once(s_enemy_chain_sealed()),
						s_enemy_attack(150, 5, 3, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "青春の苦味を知る とろ～りプリス",
				hp: 75000,
				imageno: 7411,
				attr: 4,
				spec: 2,
				move: {
					on_move: [
						s_enemy_attack(75, 5, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}],
		}, {
			appearance: [2],
			enemy: [{
				name: "燃焼のとろ～りプリス",
				hp: 25000,
				imageno: 7411,
				attr: 0,
				spec: 4,
				move: {
					on_move: [
						m_enemy_once(s_enemy_attr_weaken([1, 0, 0, 0, 0], 1.5, 5, 2)),
						s_enemy_attack(225, 5, 3, true),
					],
					atrandom: false,
					wait: 2,
					turn: 1,
				},
			}, {
				name: "ハイパービターチューカリー",
				hp: 25000,
				imageno: 7405,
				attr: 4,
				spec: 2,
				move: {
					on_popup: [
						attack_counter_dual(500, 4),
					],
					on_move: [
						s_enemy_attack(150, 5, 1, true)
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "青春の苦味を知る とろ～りプリス",
				hp: 65000,
				imageno: 7411,
				attr: 4,
				spec: 2,
				move: {
					on_move: [
						s_enemy_attack(200, 5, 3, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}],
		}, {
			appearance: [3],
			enemy: [{
				name: "燃焼のとろ～りプリス",
				hp: 25000,
				imageno: 7411,
				attr: 0,
				spec: 4,
				move: {
					on_popup: [
						damage_block_own(15000, 3),
					],
					on_move: [
						s_enemy_attack(200, 5, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "燃焼のとろ～りプリス",
				hp: 45000,
				imageno: 7411,
				attr: 0,
				spec: 4,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_attack, "全体5連撃", -1, false, 600, 5, 5),
					],
					on_move: [
						s_enemy_attack(500, 5, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "青春の苦味を知る とろ～りプリス",
				hp: 20000,
				imageno: 7411,
				attr: 4,
				spec: 2,
				move: {
					on_move: [
						m_enemy_once(s_enemy_poison(1000, 5, 3)),
						s_enemy_attack(250, 5, 1, true)
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}],
		}, {
			appearance: [4],
			enemy: [{
				name: "ハイパービターチューカリー",
				hp: 40000,
				imageno: 7405,
				attr: 4,
				spec: 2,
				move: {
					on_popup: [
						s_enemy_force_reservoir(),
					],
					on_move: [
						m_enemy_once(s_enemy_attack(1500, 3, 1, true)),
						s_enemy_attack(750, 3, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "シャドウおじいさん",
				hp: 45000,
				imageno: 7417,
				attr: 4,
				spec: 2,
				move: {
					on_popup: [
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(100, 5, 1, true)
					],
					on_angry: [
						s_enemy_attack_deadgrudge(0, 650, 1300, true),
					],
					on_move_angry: [
						s_enemy_attack(100, 5, 3, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "燃焼のとろ～りプリス",
				hp: 50000,
				imageno: 7411,
				attr: 0,
				spec: 4,
				move: {
					on_move: [
						s_enemy_attack(200, 5, 3, true)
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}],
		}, {
			appearance: [5],
			enemy: [{
				name: "シャドウおじいさん",
				hp: 50000,
				imageno: 7417,
				attr: 4,
				spec: 4,
				move: {
					on_move: [
						m_enemy_once(s_enemy_attr_weaken([1, 1, 1, 1, 1], 1.5, 5, 2)),
						s_enemy_attack(150, 5, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 2,
				},
			}, {
				name: "お菓子は全部おれのもの デザートン",
				hp: 200000,
				imageno: 7381,
				attr: 4,
				spec: 4,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_deathlimit, "死の秒針", -1, false, 5, 3),
						damage_switch(s_enemy_when_dead_l(), m_enemy_angry(), true),
					],
					on_move: [
						m_enemy_once(s_enemy_attack(550, 5, 1, true)),
						s_enemy_attack(350, 5, 1, true),
					],
					on_angry: [
						damage_block_own(8000, 3),
					],
					on_move_angry: [
						m_enemy_once(s_enemy_cursed(1000, 5, 3)),
						s_enemy_attack(110, 5, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "シャドウおじいさん",
				hp: 50000,
				imageno: 7417,
				attr: 4,
				spec: 4,
				move: {
					on_move: [
						m_enemy_once(s_enemy_discharge(5, 2)),
						s_enemy_attack(200, 5, 3, true)
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}],
		}],
	},
	// -------------------------
	// 過去のイベントトーナメント(2016/02 絶)
	// -------------------------
	{
		id: "1602ev_4",
		name: "(2016/02)イベントトーナメント 絶級",
		category: "past event",
		desc: "2016/02に開催された魔道杯:イベントトーナメントのHard:クイズ対決！です。",
		overlap: false,
		aprnum: 5,
		data: [{
			appearance: [1],
			enemy: [{
				name: "青いとろ～りプリス",
				hp: 30000,
				imageno: 7412,
				attr: 1,
				spec: 4,
				move: {
					on_move: [
						m_enemy_once(s_enemy_attack(900, 1, 1, m_enemy_tgtype_minhp())),
						s_enemy_attack(300, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "青いとろ～りプリス",
				hp: 24,
				imageno: 7412,
				attr: 1,
				spec: 4,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_attack(225, 5, 1, true)
					],
					atrandom: false,
					turn: 3,
					wait: 1,
				},
			}],
		}, {
			appearance: [2],
			enemy: [{
				name: "碧空のとろ～りプリス",
				hp: 30000,
				imageno: 7413,
				attr: 1,
				spec: 4,
				move: {
					on_move: [
						s_enemy_attack(225, 1, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "碧空のとろ～りプリス",
				hp: 13,
				imageno: 7413,
				attr: 1,
				spec: 4,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_attack(300, 5, 1, true)
					],
					atrandom: false,
					turn: 3,
					wait: 1,
				},
			}, {
				name: "イエローチューカリー",
				hp: 20000,
				imageno: 7408,
				attr: 2,
				spec: 4,
				move: {
					on_move: [
						s_enemy_attack(300, 5, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}],
		}, {
			appearance: [3],
			enemy: [{
				name: "碧空のとろ～りプリス",
				hp: 30000,
				imageno: 7413,
				attr: 1,
				spec: 4,
				move: {
					on_move: [
						s_enemy_attack(500, 3, 1, true),
						s_enemy_chain_break(),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "碧空のとろ～りプリス",
				hp: 60000,
				imageno: 7413,
				attr: 1,
				spec: 4,
				move: {
					on_move: [
						s_enemy_force_reservoir(),
						s_enemy_attack(600, 5, 1, true),
						s_enemy_attack(300, 1, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "碧空のとろ～りプリス",
				hp: 30000,
				imageno: 7413,
				attr: 1,
				spec: 4,
				move: {
					on_move: [
						s_enemy_attack(300, 1, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}],
		}, {
			appearance: [4],
			enemy: [{
				name: "碧空のとろ～りプリス",
				hp: 30000,
				imageno: 7413,
				attr: 1,
				spec: 4,
				move: {
					on_move: [
						s_enemy_attack(500, 3, 1, true),
						s_enemy_chain_break(),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "碧空のとろ～りプリス",
				hp: 60000,
				imageno: 7413,
				attr: 1,
				spec: 4,
				move: {
					on_move: [
						s_enemy_force_reservoir(),
						s_enemy_attack(600, 5, 1, true),
						s_enemy_attack(300, 1, 1, true),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "碧空のとろ～りプリス",
				hp: 30000,
				imageno: 7413,
				attr: 1,
				spec: 4,
				move: {
					on_move: [
						s_enemy_attack(300, 1, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}],
		}, {
			appearance: [5],
			enemy: [{
				name: "青いとろ～りプリス",
				hp: 40000,
				imageno: 7412,
				attr: 1,
				spec: 4,
				move: {
					on_move: [
						s_enemy_attack(250, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "知性は巡る どこまでも ハカセ",
				hp: 280000,
				imageno: 7397,
				attr: 1,
				spec: 4,
				move: {
					on_popup: [
						damage_switch(s_enemy_when_dead_l(), m_enemy_angry(), true),
					],
					on_move: [
						m_enemy_once(skill_counter(9999, 11)),
						s_enemy_attack(100, 3, 5, true),
						s_enemy_attack(500, 3, 1, true),
					],
					on_move_angry: [
						m_enemy_once(s_enemy_ss_sealed(3, 4)),
						s_enemy_attack(250, 5, 5, true),
						s_enemy_attack(1200, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "青いとろ～りプリス",
				hp: 30000,
				imageno: 7412,
				attr: 1,
				spec: 4,
				move: {
					on_popup: [
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(500, 5, 1, true),
						m_enemy_once(attack_counter(800, -1)),
					],
					on_move_angry: [
						s_enemy_attack(750, 5, 1, true),
						s_enemy_heal_all(0.1),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}],
		}],
	},
	// -------------------------
	// 過去のイベントトーナメント(2016/01)
	// -------------------------
	{
		id: "1601ev_z",
		name: "(2016/01)イベントトーナメント 絶級",
		category: "past event",
		desc: "2016/01に開催された魔道杯のイベントトーナメント絶級です。",
		overlap: false,
		aprnum: 5,
		data: [{
			appearance: [1],
			enemy: [{
				name: "朝日の妖精",
				hp: 25000,
				imageno: 7304,
				attr: 0,
				spec: 4,
				move: {
					on_move: [
						m_enemy_once(s_enemy_chain_sealed(5)),
						s_enemy_attack(1200, 1, 1, false),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "朝日の妖精",
				hp: 25000,
				imageno: 7304,
				attr: 0,
				spec: 4,
				move: {
					on_move: [
						s_enemy_attack(1000, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [2],
			enemy: [{
				name: "翡翠のドライアド",
				hp: 25000,
				imageno: 413,
				attr: 1,
				spec: 7,
				move: {
					on_popup: [
						s_enemy_division(),
					],
					on_move: [
						m_enemy_once(s_enemy_attack_attrsp(2400, 600, 1, 1, 1, false)),
						s_enemy_attack(600, 1, 1, false),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, {
				name: "暁のフェアリー",
				hp: 30000,
				imageno: 7305,
				attr: 0,
				spec: 4,
				move: {
					on_popup: [
						damage_block_own(6000, 5),
					],
					on_move: [
						s_enemy_attack(350, 3, 5, false),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "朝日の妖精",
				hp: 35000,
				imageno: 7304,
				attr: 0,
				spec: 4,
				move: {
					on_move: [
						s_enemy_attack(800, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [3],
			enemy: [{
				name: "暁のフェアリー",
				hp: 20,
				imageno: 7305,
				attr: 0,
				spec: 4,
				move: {
					on_popup: [
						impregnable(-1),
					],
					on_move: [
						s_enemy_attack(800, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "緋色のドライアド",
				hp: 40000,
				imageno: 410,
				attr: 0,
				spec: 7,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_as_sealed, "AS封印", -1, false, 5, 6),
						s_enemy_division(),
					],
					on_move: [
						s_enemy_attack(350, 3, 5, false),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "緋色のドライアド",
				hp: 40000,
				imageno: 410,
				attr: 0,
				spec: 7,
				move: {
					on_popup: [
						s_enemy_division(),
					],
					on_move: [
						m_enemy_once(s_enemy_as_sealed(3, 3)),
						s_enemy_attack(1200, 1, 1, false),
					],
					atrandom: false,
					turn: 2,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [4],
			enemy: [{
				name: "朝日の妖精",
				hp: 25000,
				imageno: 7304,
				attr: 0,
				spec: 4,
				move: {
					on_move: [
						m_enemy_once(s_enemy_chain_sealed(5)),
						s_enemy_attack(1200, 1, 1, false),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "朝日の妖精",
				hp: 25000,
				imageno: 7304,
				attr: 0,
				spec: 4,
				move: {
					on_move: [
						s_enemy_attack(1000, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [5],
			enemy: [{
				name: "湖畔のフェアリー",
				hp: 30000,
				imageno: 7307,
				attr: 1,
				spec: 4,
				move: {
					on_popup: [
						s_enemy_cursed(400, 5, 3),
					],
					on_move: [
						s_enemy_attack_attrsp(3000, 750, 1, 1, 1, false),
						s_enemy_attack(750, 1, 1, false),
					],
					atrandom: false,
					turn: 2,
					wait: 2,
				},
			}, {
				name: "非業背負いし宿星 エリーク・ハネス",
				hp: 120000,
				imageno: 7300,
				attr: 0,
				spec: 8,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_cursed, "呪い", -1, false, 2000, 5, 6),
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(300, 5, 5, false),
					],
					on_angry: [
						damage_block_own(10000, -1),
					],
					on_move_angry: [
						s_enemy_attr_weaken([1, 0, 0, 0, 0], 1.5, 5, 3),
						s_enemy_attack(300, 5, 5, false),
						s_enemy_attack(300, 5, 5, false),
						s_enemy_attack(300, 5, 5, false),
						s_enemy_attack(300, 5, 5, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "暁のフェアリー",
				hp: 50000,
				imageno: 7305,
				attr: 0,
				spec: 4,
				move: {
					on_move: [
						s_enemy_force_reservoir(),
						s_enemy_attack(3000, 5, 1, false),
						s_enemy_attack(1000, 5, 1, false),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, ],
	},

	// -------------------------
	// AbCd01 hard
	// -------------------------
	{
		id: "abcd01_h",
		name: "AbyssCode01 黒殻の王『真覇級』",
		category: "other",
		desc: "",
		aprnum: 4,
		overlap: false,
		hidden: false,
		data: [{
			appearance: [1],
			enemy: [{
				name: "ファハシュヴァイル",
				hp: 30000,
				imageno: 4067,
				attr: 0,
				spec: 2,
				move: {
					on_move: [
						s_enemy_attack(400, 3, 4, true),
						s_enemy_attr_weaken([1, 0, 1, 0, 0], 1.5, 5, 5),
					],
					turn: 1,
					wait: 2,
				}
			}, {
				name: "ウラガーン(S)",
				hp: 50000,
				imageno: 3707,
				attr: 0,
				spec: 11,
				move: {
					on_move: [
						s_enemy_attack(750, 5, 1, true),
						s_enemy_attack(750, 5, 1, true),
						s_enemy_chain_break(),
					],
					turn: 1,
					wait: 1,
				}
			}, ],
		}, {
			appearance: [2],
			enemy: [{
				name: "ルインコンダクター",
				hp: 15000,
				imageno: 4070,
				attr: 2,
				spec: 2,
				move: {
					on_move: [
						// パネルチェンジ(雷)
						s_enemy_attack_attrsp(3300, 550, [0, 1, 0, 0, 0], 5, 1, true),
					],
					turn: 2, // 暫定処置
					wait: 2,
				}
			}, {
				name: "ウラガーン(S+)",
				hp: 90000,
				imageno: 3708,
				attr: 0,
				spec: 11,
				move: {
					on_popup: [
						s_enemy_attack_ratio(0.9, 5, true),
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_chain_sealed(5),
						s_enemy_poison(1000, 5, 6),
					],
					on_angry: [
						attr_change(4),
					],
					on_move_angry: [
						s_enemy_attack(600, 3, 5, true),
					],
					turn: 1,
					wait: 1,
				}
			}, ],
		}, {
			appearance: [3],
			enemy: [{
				name: "リジョンディッシェル",
				hp: 50000,
				imageno: 4069,
				attr: 1,
				spec: 7,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_all_sealed, "全体封印", -1, false, 5, 5),
					],
					on_move: [
						s_enemy_ss_sealed(5, 6),
						s_enemy_chain_break(),
					],
					turn: 1,
					wait: 1,
				},
			}, {
				name: "ウラガーン(SS)",
				hp: 120000,
				imageno: 4066,
				attr: 0,
				spec: 11,
				move: {
					on_move: [
						m_enemy_once(s_enemy_poison(1000, 5, 6)),
						s_enemy_attack(2000, 1, 1, m_enemy_tgtype_maxhp()),
					],
					turn: 2,
					wait: 1,
				},
			}, {
				name: "ファングサーラ",
				hp: 30000,
				imageno: 4068,
				attr: 0,
				spec: 5,
				move: {
					on_popup: [
						damage_block_own(20000, 6)
					],
					on_move: [
						s_enemy_attack(2000, 1, 1, m_enemy_tgtype_maxhp()),
					],
					turn: 2,
					wait: 2,
				},
			}, ],
		}, {
			appearance: [4],
			enemy: [{
				name: "ファハシュヴァイル",
				hp: 100000,
				imageno: 4067,
				attr: 0,
				spec: 2,
				move: {
					on_popup: [
						s_enemy_attack_ratio(0.9, 5, true),
					],
					on_move: [
						s_enemy_attack(2000, 5, 1, true),
						s_enemy_attack(1500, 5, 1, true),
					],
					turn: 1,
					wait: 1,
				}
			}, {
				name: "ウラガーン(L)",
				hp: 500000,
				imageno: 6783,
				attr: 0,
				spec: 11,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_all_sealed, "全体封印", -1, false, 5, 11),
						damage_switch(s_enemy_when_hpdown(0.5), m_enemy_angry()),
					],
					on_move: [
						s_enemy_attack(2000, 1, 1, m_enemy_tgtype_maxhp()),
					],
					on_angry: [
						attr_change(4),
					],
					on_move_angry: [
						s_enemy_attack_ratio(0.9, 5, true),
						/* 全属性ガード */
						s_enemy_attack_deadgrudge(2400, 3600, 4800, true),
					],
					turn: 1,
					wait: 1,
				}
			}, {
				name: "ファングサーラ",
				hp: 80000,
				imageno: 4068,
				attr: 0,
				spec: 7,
				move: {
					on_popup: [
						attack_counter_dual(1000, -1),
					],
					on_move: [
						s_enemy_chain_sealed(5),
						s_enemy_chain_break(),
					],
					turn: 1,
					wait: 1,
				}
			}, ],
		}, ],
	},
	// -------------------------
	// AbCd01 normal
	// -------------------------
	{
		id: "abcd01_n",
		name: "AbyssCode01 黒殻の王『黒業級』",
		category: "other",
		desc: "",
		aprnum: 4,
		overlap: false,
		hidden: false,
		data: [{
			appearance: [1],
			enemy: [{
				name: "ファハシュヴァイル",
				hp: 30000,
				imageno: 4067,
				attr: 0,
				spec: 0,
			}, {
				name: "ウラガーン",
				hp: 40000,
				imageno: 3706,
				attr: 0,
				spec: 11,
			}, {
				name: "ファングサーラ",
				hp: 20000,
				imageno: 4068,
				attr: 0,
				spec: 7,
				move: {
					on_move: [
						m_enemy_once(s_enemy_poison(500, 5, 3)),
					],
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [2],
			enemy: [{
				name: "ルインコンダクター",
				hp: 15000,
				imageno: 4070,
				attr: 2,
				spec: 0,
				move: {
					on_popup: [
						skill_counter(9999, -1),
					]
				}
			}, {
				name: "ウラガーン",
				hp: 60000,
				imageno: 3707,
				attr: 0,
				spec: 11,
			}, ],
		}, {
			appearance: [3],
			enemy: [{
				name: "ファングサーラ",
				hp: 35000,
				imageno: 4068,
				attr: 0,
				spec: 7,
				move: {
					on_move: [
						s_enemy_poison(500, 5, 3),
					],
					turn: 1,
					wait: 3,
				},
			}, {
				name: "ウラガーン",
				hp: 90000,
				imageno: 3708,
				attr: 0,
				spec: 11,
				move: {
					on_popup: [
						s_enemy_force_reservoir(),
					],
				},
			}, {
				name: "リジョンディッシェル",
				hp: 60000,
				imageno: 4069,
				attr: 1,
				spec: 5,
			}, ],
		}, {
			appearance: [4],
			enemy: [{
				name: "ファハシュヴァイル",
				hp: 60000,
				imageno: 4067,
				attr: 0,
				spec: 0,
				move: {
					on_popup: [
						skill_counter(9999, -1),
					]
				}
			}, {
				name: "ウラガーン",
				hp: 180000,
				imageno: 4066,
				attr: 0,
				spec: 11,
				move: {
					on_popup: [
						s_enemy_attr_weaken([1, 0, 0, 0, 0], 1.25, 5, -1),
					]
				}
			}, {
				name: "ファングサーラ",
				hp: 35000,
				imageno: 4068,
				attr: 0,
				spec: 7,
				move: {
					on_popup: [
						skill_counter(9999, -1),
					]
				}
			}, ],
		}, ],
	},

	// -------------------------
	// April fooooool
	// -------------------------
	{
		id: "af_2016",
		name: "仮想陸式(エイプリルフール)",
		category: "other",
		desc: "2016年度も頑張りましょう",
		overlap: false,
		aprnum: 5,
		data: [{
			appearance: [1],
			enemy: [{
				name: "花咲ける森の王 ビッグカリフー",
				hp: 20000,
				imageno: 7168,
				attr: 0,
				spec: 6,
				move: {
					on_popup: [
						s_enemy_division(),
					],
					on_move: [
						s_enemy_attack(100, 3, 3, true),
						s_enemy_chain_sealed(5),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "紅鏡サーチャー",
				hp: 25000,
				imageno: 3728,
				attr: 0,
				spec: 5,
				move: {
					on_popup: [
						damage_block_own(20000, 2),
						s_enemy_division(),
					],
					on_move: [
						s_enemy_attack(300, 5, 1, true)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [2],
			enemy: [{
				name: "レナ(雷)",
				hp: 15000,
				imageno: 6370,
				attr: 2,
				spec: 9,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_ss_sealed, "SP封印", -1, false, 5, 6),
					],
					on_move: [
						s_enemy_force_reservoir(),
						s_enemy_attack(5000 / 3, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "レナ(火)",
				hp: 25,
				imageno: 5415,
				attr: 0,
				spec: 9,
				move: {
					on_popup: [
						impregnable(-1),
						s_enemy_division(),
					],
					on_move: [
						m_enemy_once(attack_counter_dual(700, 5)),
						s_enemy_attack(1000, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, ],
		}, {
			appearance: [3],
			enemy: [{
				name: "エリス",
				hp: 90000,
				imageno: 6373,
				attr: 1,
				spec: 9,
				move: {
					on_popup: [
						s_enemy_chain_break(),
						skill_counter_func(s_enemy_chain_break, "チェイン解除", -1, false),
						damage_switch(s_enemy_when_hpdown(0.8), m_enemy_angry()),
					],
					on_move: [
						m_enemy_once(s_enemy_as_sealed(5, 7)),
						m_enemy_once(s_enemy_poison(1000, 5, 4)),
						s_enemy_attack(2000 / 2, 5, 1, true),
					],
					on_angry: [
						s_enemy_cursed(2500, 5, 3)
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				}
			}, ],
		}, {
			appearance: [4],
			enemy: [{
				name: "リルム",
				hp: 100000,
				imageno: 6167,
				attr: 0,
				spec: 9,
				move: {
					on_move: [
						s_enemy_chain_break(),
						s_enemy_attack(1000, 5, 1, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "エターナル・ロア",
				hp: 160000,
				imageno: 6377,
				attr: 0,
				spec: 9,
				move: {
					on_popup: [
						attack_counter_dual(700, 3),
						damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(300, 3, 3, true),
					],
					on_angry: [
						attr_change(4)
					],
					on_move_angry: [
						s_enemy_attack(800, 3, 3, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "ソフィ",
				hp: 50000,
				imageno: 6367,
				attr: 2,
				spec: 9,
				move: {
					on_popup: [
						damage_switch(s_enemy_when_dead(0), m_enemy_angry(), true),
					],
					on_move: [
						s_enemy_attack(500 / 2.25, 1, 1, true),
					],
					on_angry: [
						skill_counter_func(s_enemy_attack, "全体6連撃", -1, false, 800 / 2.25, 5, 6),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, {
			appearance: [5],
			enemy: [{
				name: "アリエッタ(雷)",
				hp: 40000,
				imageno: 7576,
				attr: 2,
				spec: 9,
				move: {
					on_popup: [
						attack_counter_dual(700, 4),
					],
					on_move: [
						s_enemy_attack(300 / 2.25, 3, 5, true),
						s_enemy_chain_break(),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "アリエッタ(火)",
				hp: 600000,
				imageno: 6361,
				attr: 0,
				spec: 9,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_healreverse, "回復反転(50%)", -1, false, 0.5, 5),
						damage_switch(s_enemy_when_hpdown(0.5), m_enemy_angry(), true),
					],
					on_move: [
						m_enemy_once(s_enemy_attack_ratio(0.9, 5, false)),
						s_enemy_attack(200, 3, 5, true),
					],
					on_angry: [
						attr_change(1),
					],
					on_move_angry: [
						m_enemy_once(s_enemy_attack_ratio(0.9, 5, false)),
						m_enemy_once(s_enemy_as_sealed(5, 7)),
						s_enemy_attack(500, 3, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, {
				name: "アリエッタ(水)",
				hp: 160000,
				imageno: 5900,
				attr: 1,
				spec: 9,
				move: {
					on_popup: [
						skill_counter_func(s_enemy_poison, "毒(1000)", -1, false, 1000, 5, 5),
					],
					on_move: [
						s_enemy_discharge(5, 2),
						s_enemy_attack(300 / 1.5, 3, 5, true),
					],
					atrandom: false,
					turn: 1,
					wait: 1,
				},
			}, ],
		}, ],
	},


];