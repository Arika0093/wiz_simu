// -------------------------
// クエストデータ
// -------------------------
Quests = [
	// -------------------------
	// test quest
	// -------------------------
	{
		id: "test",
		name: "テスト用クエスト",
		category: "original",
		desc: "テスト用のクエストです。六段から参式までのギルマスが出ます。",
		aprnum: 3,
		enemys: [
			{
				appearance: [1],
				data: [
					{
						name: "バロン",
						imageno: 3279,
						hp: 51145,
						atk: 0,
						attr: 2,
						spec: 5,
					},
					{
						name: "アレク",
						imageno: 3280,
						hp: 54420,
						atk: 0,
						attr: 0,
						spec: 9,
					},
					{
						name: "ロレッタ",
						imageno: 3281,
						hp: 58000,
						atk: 0,
						attr: 1,
						spec: 9,
					},
				],
			},
			{
				appearance: [2],
				data: [
					{
						name: "ルシェ",
						imageno: 3282,
						hp: 90000,
						atk: 0,
						attr: 1,
						spec: 0,
					},
					{
						name: "ドゥーガ",
						imageno: 3283,
						hp: 170000,
						atk: 0,
						attr: 2,
						spec: 9,
					},
					{
						name: "ベルナデッタ",
						imageno: 3284,
						hp: 200000,
						atk: 0,
						attr: 1,
						spec: 9,
					},
				],
			},
			{
				appearance: [3],
				data: [
					{
						name: "オルネ",
						imageno: 4091,
						hp: 120000,
						atk: 0,
						attr: 2,
						spec: 9,
					},
					{
						name: "ティア",
						imageno: 5223,
						hp: 360000,
						atk: 0,
						attr: 0,
						spec: 9,
					},
				],
			},
		],
	},


	// -------------------------
	// トーナメント: 弐式
	// -------------------------
	{
		id: "grade12",
		name: "賢王【瞬】弐式(トーナメント十二段)",
		category: "tornament",
		desc: "炎推奨のトーナメントです。1位入賞時2600pt。入賞確実: 5-6t / タイム勝負: 7t-",
		aprnum: 5,
		enemys: [
			{
				// 雷牛 / 火タービン
				appearance: [1, 2, 3, 4],
				data: [
					{
						name: "雷牛",
						hp: 19800,
						imageno: -1,
						atk: 0,
						attr: 2,
						spec: 7,
					},
					{
						name: "火タービン",
						hp: 13200,
						imageno: -1,
						atk: 0,
						attr: 0,
						spec: 6,
					},
				],
			},
			{
				// 雷タービン / 火カーバンクル
				appearance: [1, 2, 3, 4],
				data: [
					{
						name: "雷タービン",
						hp: 19800,
						imageno: -1,
						atk: 0,
						attr: 2,
						spec: 6,
					},
					{
						name: "火カーバンクル",
						hp: 13200,
						imageno: -1,
						atk: 0,
						attr: 0,
						spec: 4,
					},
				],
			},
			{
				// 雷カーバンクル / 水タービン
				appearance: [1, 2, 3, 4],
				data: [
					{
						name: "雷カーバンクル",
						hp: 19800,
						imageno: -1,
						atk: 0,
						attr: 2,
						spec: 4,
					},
					{
						name: "水タービン",
						hp: 6600,
						imageno: -1,
						atk: 0,
						attr: 1,
						spec: 6,
					},
				],
			},
			{
				// 雷タービン / 雷カーバンクル
				appearance: [1, 2, 3, 4],
				data: [
					{
						name: "雷タービン",
						hp: 19800,
						imageno: -1,
						atk: 0,
						attr: 2,
						spec: 6,
					},
					{
						name: "雷カーバンクル",
						hp: 19800,
						imageno: -1,
						atk: 0,
						attr: 2,
						spec: 4,
					},
				],
			},
			{
				// 火タービン / 火タービン
				appearance: [1, 2, 3, 4],
				data: [
					{
						name: "火タービン",
						hp: 13200,
						imageno: -1,
						atk: 0,
						attr: 0,
						spec: 6,
					},
					{
						name: "火タービン",
						hp: 13200,
						imageno: -1,
						atk: 0,
						attr: 0,
						spec: 6,
					},
				],
			},
			{
				// 雷牛 / 水牛
				appearance: [1, 2, 3, 4],
				data: [
					{
						name: "雷牛",
						hp: 19800,
						imageno: -1,
						atk: 0,
						attr: 2,
						spec: 7,
					},
					{
						name: "水牛",
						imageno: -1,
						hp: 6600,
						atk: 0,
						attr: 1,
						spec: 7,
					},
				],
			},
			{
				// (ボス)火タービン / オルネ / 水カーバンクル
				appearance: [5],
				data: [
					{
						name: "火タービン",
						imageno: -1,
						hp: 35000,
						atk: 0,
						attr: 0,
						spec: 6,
					},
					{
						name: "オルネ",
						imageno: 4091,
						hp: 120000,
						atk: 0,
						attr: 2,
						spec: 9,
					},
					{
						name: "水カーバンクル",
						imageno: -1,
						hp: 25000,
						atk: 0,
						attr: 1,
						spec: 7,
					},
				],
			},
		],
	},
];