// 全データ
var Field = {
	// 各種定数(主に表示用)
	Constants: {
		Attr: {
			"-1": "無",
			0: "火",
			1: "水",
			2: "雷",
			3: "光",
			4: "闇",
		},
		Species: [
			"龍族",
			"神族",
			"魔族",
			"天使",
			"妖精",
			"亜人",
			"物質",
			"魔法生物",
			"戦士",
			"術士",
			"アイテム",
			"AbCd",
		],
		Actlog_Ver: 106,
	},
	// クエストデータ
	Quest: {},
	// 味方データ
	Allys: {
		// カードデータ
		Deck: [],
		// 現在のステータス(maxhp, nowhp, atk, mana, ...)
		Now: [],
	},
	// 敵データ
	Enemys: {
		// 敵の出現順
		Popuplist: [],
		// 敵ステータス管理
		Data: [],
	},
	// 現在の状況管理
	Status: {
		seed: -1,                   // 乱数生成シード(試走結果再現に使用)
		const_rand: null,           // 乱数固定用の変数, nullなら参照しない(DOMから読む)
		// チェイン関連
		chain: 0,
		chain_status: 0,
		chain_awguard: 0,
		chainstat_turn: 0,
		// AS処理関連
		chain_redtask: [],          // チェイン消費タスク
		hpcons_task: [0,0,0,0,0],   // 全体自傷HPタスク
		p_chain: 1,                 // パネル連結数
		// パネル付与関連
		panel_color: [],            // パネル色保存
		panel_add: [],
		panel_guard: {
			attr: [],
			rate: 0,
		},
		// 継続効果関連
		continue_eff: [],
		// 最後に使用したSS
		latest_ss: null,
		latest_now: null,
		// 蓄積系スキルの共通データ
		accumulate_heal: 0,     // 合計回復値
		accumulate_dmg: 0,      // 合計ダメージ量
		accumulate_asok: 0,     // 合計ASOverkillDmg量
		// ステアップの上限値保存
		statusup_max: [2000, 2000],
		// 助っ人関連
		is_helper: false,		// 助っ人が存在するかどうか
		is_hlpchanged: false,	// 助っ人と交代済であるか
		hlpchanged_index: -1,	// 交代した先のindex
		// ターンetc関連
		is_initialize: true,	// 初期化処理の最中はtrue
		durturn: [],
		nowturn: 1,
		totalturn: 0,
		nowbattle: 1,
		finish: false,
		limit_turn: -1,
		limit_now: -1,
		// 行動ログ
		act_log: [],
		is_spanel_only: true,
		turn_dmg: 0,
		total_kill: 0,
		speedscore: 0,
		// 結果保存
		result_id: 0,
		// 文字ログ
		log: [],
		d_log: [],
	},
	log_push: function (text, color) {
		var fs = this.Status;
		if (fs.log[fs.totalturn] === undefined) {
			fs.log[fs.totalturn] = [];
		}
		text = color ? "//{" + color + "}" + text + "{}//" : text;
		fs.log[fs.totalturn].push(text);
	},
	detail_log: function (fc, title, text) {
		var fs = this.Status;
		fs.d_log.push(`#${fs.nowbattle}|${fs.totalturn+1}: ${text}`);
	}
}

// Field変数のログ(値が変わるallys.now, enemys.data, statusのみ入れておく)
var Field_log = {
	Allys: {},
	Enemys_data: [],
	Enemys_revdata: [],
	Status: [],
	now_index: 0,
	is_ssindex: false,
	// 保存関数
	save: function (index, fld) {
		this.Allys[index] = $.extend(true, {}, fld.Allys);
		this.Enemys_data[index] = $.extend(true, [], fld.Enemys.Data);
		this.Enemys_revdata[index] = $.extend(true, [], fld.Enemys.revData);
		this.Status[index] = $.extend(true, {}, fld.Status);
		this.now_index = index;
		// 保存indexより先の要素は消す
		this._removeover(index);
	},
	// 読み込み関数
	load: function (index) {
		var fld_reset = $.extend(true, {}, Field);
		fld_reset.Allys = $.extend(true, {}, this.Allys[index]);
		fld_reset.Enemys.Data = $.extend(true, [], this.Enemys_data[index]);
		fld_reset.Enemys.revData = $.extend(true, [], this.Enemys_revdata[index]);
		fld_reset.Status = $.extend(true, {}, this.Status[index]);
		this.now_index = index;
		return fld_reset;
	},
	// サイズ
	length: function () {
		for (var i = 0; i < this.Status.length; i++) {
			if (!this.Status[i] || this.Status[i].chain === undefined) {
				return i;
			}
		}
		return this.Status.length;
	},
	// indexから先の余計な要素を消す
	_removeover: function (index) {
		for (var i = index + 1; i < this.length() ; i++) {
			this.Allys[i] = [];
			this.Enemys_data[i] = [];
			this.Status[i] = {};
		}
	}
}

// URLからデッキ/クエストを読み込む
$(function () {
	// load
	var deckdata = deckdata_Load(null, function (data) {
		// check
		if (data != null) {
			var simQuest = $.grep(Quests, function (e, i) {
				return e.id == data.quest;
			})[0];
			// 敵データを読み込む
			Field.Quest = simQuest;
			// -------------------------
			// 味方データを読み込む
			var als = Field.Allys;
			als.Deck = [];
			als.Now = new Array();
			for (var i = 0; i < data.deck.length; i++) {
				// 精霊読み込み
				var card = $.grep(Cards, function (e) {
					return e.cardno == data.deck[i].cardno;
				})[0];
				if (!card) { continue; }
				// def_attr定義
				card.def_attr = $.extend(true, [], card.attr);
				// 代入
				var ally = als.Deck[i] = $.extend(true, {}, card);
				// 潜在結晶を追加
				ally.crystal = data.deck[i].crystal;
				// 潜在個数を反映
				var awk_length = data.deck[i].awake;
				if (awk_length >= 0 && awk_length !== ally.awakes.length) {
					ally.awakes = ally.awakes.slice(0, awk_length);
				}
				// 現在のステ
				var now = als.Now[i] = {};
				var mana = data.deck[i].mana;
				now.mana = mana;
				now.lv = data.deck[i].level;
				now.maxhp = calcLvStatus(now.lv, (card.islegend ? 110 : 90), Math.floor(card.hp/2), card.hp, mana);
				now.nowhp = now.maxhp;
				now.atk = calcLvStatus(now.lv, (card.islegend ? 110 : 90), Math.floor(card.atk/2), card.atk, mana);
				now.def_hp = now.maxhp;	// 初期状態のHP(マナ込み)
				now.def_atk = now.atk;	// 初期状態のATK(マナ込み)
				now.def_awhp = now.def_hp;      // 潜在込みのHP(初期状態ではdef_hpと同じ)
				now.def_awatk = now.def_atk;    // 潜在込みのATK(初期状態ではdef_atkと同じ)
				now.upval_hp = 0;
				now.upval_atk = 0;
				now.def_attr = card.attr;
				now.accumulateHealCount = 0;
				now.accumulateBurnCount = 0;
				now.accumulateASOverkillCount = 0;
				now.target = [];
				now.flags = {};
				now.flags.enemy_counter = [];
				now.flags.skill_counter = [];
				now.flags.damage_hits = [];
				now.turn_effect = [];
				now.after_turn = [];
				// SS状態をリセット
				now.ss_quizcount = 0;
				now.ss_current = has_fastnum(Field, ally);	// SSチャージターン
				now.ss_isfirst = true;	// SSをまだ発動していないかどうか
				now.ss_isboost = false;	// スキブを受けたかどうか
				now.islegend = (get_ssturn(Field, card, now)[1] == 0); // Lモードかどうか(card.islegendとは意味合いが違うので注意)
				now.lgstart_turn = -1;
				// HPATK入れ替え結晶の有無
				var is_replacement_hpatk = $.grep(ally.crystal, e => {
					return e.type == "Awake_hpatk_replace"
				}).length > 0;
				if(is_replacement_hpatk){
					// def_xxだけ入れ替えれば後はfunc_reawakeで自動計算される
					var temp = now.def_hp
					now.def_hp = now.def_atk;
					now.def_atk = temp;
				}
			}
			// 空要素を詰める
			als.Deck = $.grep(als.Deck, function (e) { return e !== undefined; });
			als.Now = $.grep(als.Now, function (e) { return e !== undefined; });
			// 助っ人チェック
			if (!!als.Deck[5]) {
				if (!simQuest.is_notusedhelper) {
					// 助っ人用位置へ移動させる(連番位置に置いておくと不便なので)
					als.Deck["helper"] = als.Deck[5];
					als.Now["helper"] = als.Now[5];
					Field.Status.is_helper = true;
				}
				als.Deck.pop();
				als.Now.pop();
			}
			// 潜在を反映させる
			if(simQuest.disable_awake){
				Field.log_push("【このクエストでは潜在能力の一部が制限されています】", "blue");
			}
			// ステアップ潜在の反映
			func_reawake(Field, als.Deck, als.Now);
			// チェインガード潜在の反映(助っ人込み)
			for(var i in als.Deck){
				var has_chguard = pickup_awakes(Field, als.Deck[i], "awake_chainguard", false).length > 0;
				if(has_chguard){
					Field.Status.chain_awguard += 1;
				}
			}
			// チェインブースト処理(助っ人は含めないので上と別処理)
			var dck = als.Deck;
			for (var i = 0; i < dck.length; i++) {
				var aws = pickup_awakes(Field, dck[i], "awake_chboost", false);
				var add_chain = 0;
				$.each(aws, function (j, f) {
					add_chain += f.add;
				});
				if (add_chain > 0) {
					Field.Status.chain += add_chain;
					Field.log_push("Unit[" + (i + 1) + "]: Chain-Boost: +" + add_chain);
				}
			}
			// 戦闘開始前処理
			if (Field.Quest.battle_before) {
				var bbef = Field.Quest.battle_before;
				for (var i = 0; i < bbef.length; i++) {
					ss_object_done(Field, -1, bbef[i].proc);
				}
			}
			// -------------------------
			// 出現順番
			var fes = Field.Enemys;
			fes.Popuplist = CreateEnemypopup(Field, simQuest);
			for (var i = 0; i < fes.Popuplist.length; i++) {
				var popup_enemys = simQuest.data[fes.Popuplist[i]];
				// 敵ステ
				fes.Data[i] = {};
				var data = fes.Data[i];
				data.enemy = [];
				for (var j = 0; j < popup_enemys.enemy.length; j++) {
					data.enemy[j] = $.extend(true, {}, popup_enemys.enemy[j]);
					data.enemy[j].nowhp = popup_enemys.enemy[j].hp;
					data.enemy[j].contract_dmgs = [];
					data.enemy[j].flags = {};
					data.enemy[j].flags.is_as_attack = [];
					data.enemy[j].turn_effect = [];
					//data.enemy[j].after_turn = [];
				}
			}
			// 蘇生時データ
			if (simQuest.revData) {
				fes.revData = [];
				for (var i = 0; i < simQuest.revData.length; i++) {
					var edat = simQuest.revData[i];
					// 敵ステ
					fes.revData[i] = {};
					fes.revData[i] = $.extend(true, {}, edat);
					fes.revData[i].nowhp = edat.hp;
					fes.revData[i].contract_dmgs = [];
					fes.revData[i].flags = {};
					fes.revData[i].flags.is_as_attack = [];
					fes.revData[i].turn_effect = [];
				}
			}
			// タゲリセット
			target_allselect(Field, -1);
			// 敵の処理
			enemy_popup_proc(Field);
			// -------------------------
			//クエスト依存パネル効果の設定
			var fq = Field.Quest;
			if (fq.panel_effect) {
				var peff = Field.Quest.panel_effect;
				for (var i = 0; i < peff.length; i++) {
					ss_object_done(Field, 0, peff[i]);
				}
			}
			// 連結パネル使用可能なら要素を表示させる
			if(fq.panelchainEnable) {
				var pcs = $("#pchain_sel");
				pcs.show();
				if(fq.panelchainDefault > 1){
					pcs.val(fq.panelchainDefault);
				}
			}
			// 魔道杯乱舞方式なら処理を変更
			if (Field.Quest.limitturn) {
				var fs = Field.Status;
				fs.limit_turn = fs.limit_now = Field.Quest.limitturn;
			}
			// 初期化処理終了
			Field.Status.is_initialize = false;
			// 初期状態を保存
			Field_log.save(0, Field);
			// 表示
			$("#sim_log_inner").accordion({
				active: false,
				heightStyle: "content",
				collapsible: true
			});
			sim_show(Field);
		} else {
			$("#sim_info_status").html("#ERROR: URLが正しくありません。");
			$(".panel_button").attr("disabled", "disabled");
		}
	});
});

// 全読み込みが終わってから実行
$(window).load(function () {
	// スマホ版でなければ
	if (window.innerWidth >= 600) {
		// Simulatorの位置に移動する
		scrollTo(0, $("#sim_top").offset().top + 1);
	} else {
		// 広告の位置に移動する
		scrollTo(0, $("div.simu_ads").offset().top - 1);
	}
});

// LvからHP/ATKを計算する
function calcLvStatus(nowLv, maxLv, statusAt1, maxStatus, mana) {
	nowLv = nowLv || maxLv;
	return Math.floor((statusAt1) + (maxStatus - statusAt1) / (maxLv - 1) * (nowLv - 1)) + mana;
}

// 次のターンに進む
function nextturn(fld, is_ssfin) {
	var f_st = fld.Status;
	// 効果の継続確認
	ss_continue_effect_check(fld, is_ssfin);
	turn_effect_check(fld, false, is_ssfin);
	enemy_turn_effect_check(fld, false);
	// 撃破時潜在結晶
	Awake_KillSpSkill(fld, is_ssfin);
	// 烈眼ダメージ
	retsugan_check(fld, is_ssfin);
	// 死亡時トリガーを確認
	enemy_check_ondead(fld);
	// 怒り & スキルカウンターを再度確認（残滅などのスキル確認で状況が変化した可能性があるため）
	enemy_damage_switch_check(fld, "damage_switch", false, false, false);
	// 全滅していなかったら効果ターンを減少
	reduce_turneffect(fld, is_ssfin);
	turn_effect_check(fld, true, is_ssfin);
	enemy_turn_effect_check(fld, true);
	// 各精霊のL処理をここで行う
	for (var i = 0; i < fld.Allys.Deck.length; i++) {
		var now = fld.Allys.Now[i];
		if (now.nowhp > 0) {
			// L処理
			legend_timing_check(fld, fld.Allys.Deck, fld.Allys.Now, i);
		}
	}
	// 総ダメージ出力
	fld.log_push("TURN TOTAL DAMAGE: " + fld.Status.turn_dmg, "blue");
	fld.Status.turn_dmg = 0;

	// 全滅確認 & ターン進行
	var killed = allkill_check(fld, is_ssfin);
	if (killed && !f_st.finish) {
		// 戦後回復処理
		var cards = fld.Allys.Deck;
		var nows = fld.Allys.Now;
		var abh_r = cards_heal_afterbattle(fld, cards, nows);
		for(var i=0; i < abh_r.length; i++){
			var abh = abh_r[i];
			if (abh > 0) {
				heal_ally(fld, Math.floor(nows[i].maxhp * abh), i);
				fld.log_push(`Unit[${i+1}]: 戦後回復: ${abh * 100}%`);
			};
		}
		// 戦闘開始前処理
		if (fld.Quest.battle_before) {
			var bbef = fld.Quest.battle_before;
			for (var i = 0; i < bbef.length; i++) {
				if(bbef[i].isev){
					ss_object_done(fld, -1, bbef[i].proc);
				}
			}
		}
		// パネル状態をリセット
		fld.Status.panel_color = [];
		// 出現前にフラグリセット
		initialize_allys_flags(fld, nows);
		// ここで新しい敵の処理を行う
		enemy_popup_proc(fld);
		// 最終戦で、GA潜在が利用できる状況(暫定的に助っ人の利用可能状況で判定)なら処理する
		var fq = fld.Quest;
		if(fq.aprnum == f_st.nowbattle && !fq.is_notusedhelper){
			// GA潜在を誰かが所持しているか確認
			$.each(fld.Allys.Deck, (i, e) => {
				var aw_t = pickup_awakes(fld, e, "awake_skillFC_atBoss", false);
				var aw_db = pickup_awakes(fld, e, "awake_doubleSkill_atBoss", false);
				if(aw_t.length > 0) {
					// 発動
					fld.log_push(`Unit[${i+1}]: 「選ばれし者の証」発動`, "orange");
					ss_object_done(fld, i, spskill_maxcharge());
				}
				if(aw_db.length > 0) {
					// 発動
					fld.log_push(`Unit[${i+1}]: 「選ばれし者の名誉」発動`, "orange");
					ss_object_done(fld, i, ss_doubleskill_all(3));
				}
			});
		}
	}
	// チェイン状態の確認
	if (f_st.chain_status != 0) {
		if (f_st.chain_status >= 2 || !killed) {
			f_st.chainstat_turn -= 1;
		}
		if (f_st.chainstat_turn == 0) {
			f_st.chain_status = 0;
			fld.log_push("Status: チェイン状態解除");
		}
	}
	// SSで全滅させてない or 全ての敵を全滅
	if (!is_ssfin || killed) {
		f_st.totalturn += 1;
	}
	// 魔道杯乱舞の終了処理
	if (!is_ssfin && !killed) {
		f_st.limit_now -= 1;
		// 残りターンが0になったら終了フラグを立てる
		if (!killed && f_st.limit_turn > 0 && f_st.limit_now <= 0) {
			f_st.finish = true;
			f_st.fin_timeup = true;
		}
	}
	// 全終了してたらサーバーに結果送信
	if (fld.Status.finish && !fld.Status.fin_timeup && !fld.Status.isautomode) {
		actl_send_result(fld, function (rst) {
			var js = JSON.parse(rst);
			fld.Status.result_enc = js.result_enc;
			fld.Status.result_id = Number(js.result_id);
			$("#dialog_simfinish_popup").dialog("open");
			return true;
		});
	}
	// フラグの初期化
	initialize_allys_flags(fld, fld.Allys.Now);
	fld.Status.panel_guard = {
		attr: [],
		rate: 0,
	};
	// チャージスキル処理
	turneff_chargeskill_check(fld);
	// 助っ人関連の処理
	helper_change_process(fld);
	// seed リセット
	fld.Status.seed = 0;
	// ログ保存
	if(!fld.Status.isautomode){
		Field_log.save(f_st.totalturn, fld);
		Field_log._removeover(f_st.totalturn);
		Field_log.is_ssindex = false;
	}
}

// 味方フラグを初期化する
function initialize_allys_flags(fld, nows) {
	$.each(nows, function (i, e) {
		e.flags.enemy_counter = [];
		e.flags.skill_counter = [];
		e.flags.damage_hits = [];
	});
}

// 助っ人交代の処理
// (別ファイルを作るには内容が少ないのでここに記載)
function helper_change_process(fld) {
	var fs = fld.Status;
	var deck = fld.Allys.Deck;
	var nows = fld.Allys.Now;
	// チェックの必要がないなら何もしない
	if (!fs.is_helper || is_ally_alldeath(fld)) {
		return;
	}
	for (var i = 0; i < nows.length ; i++) {
		if (fs.is_hlpchanged) {
			continue;
		}
		if (nows[i].nowhp <= 0) {
			// 入れ替え(Deck)
			var sw_d = deck[i];
			fld.Allys.Deck[i] = deck["helper"];
			fld.Allys.Deck["helper"] = sw_d;
			// 入れ替え(Now)
			var sw_n = nows[i];
			nows[i] = nows["helper"];
			nows["helper"] = sw_n;
			// 処理(L化)
			nows[i].ss_current = 999;
			legend_timing_check(fld, fld.Allys.Deck, fld.Allys.Now, i);
			// フラグON
			fs.is_hlpchanged = true;
			fs.hlpchanged_index = i;
			fld.log_push("Unit[" + (i + 1) + "]: 助っ人交代");
			// タゲを自動状態に設定
			nows[i].target = [-1, -1];
			// 潜在をかけ直す
			//func_reawake(fld, fld.Allys.Deck, fld.Allys.Now, true);
		}
	}

}