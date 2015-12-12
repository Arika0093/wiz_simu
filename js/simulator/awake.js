﻿// 潜在能力から特定要素のみを抜き出す
// (L時の潜在を含める場合は第三引数をtrueにする。正確性について保証しないため注意)
function pickup_awakes(card, type, contain_legend) {
	var awakes = new Array();
	awakes = awakes.concat($.grep(card.awakes, function (e) {
		return e.type == type;
	}));
	if (contain_legend) {
		awakes = awakes.concat($.grep(card.Lawake, function (e) {
			return e.type == type;
		}));
	}
	return awakes;
}

// 潜在能力を味方に反映させる
function add_awake_ally(cards, nows, own_no, legend_skill) {
	// 自身ステアップ
	var own_statups = pickup_awakes(cards[own_no], "own_status_up", legend_skill);
	// 味方ステアップ
	var ally_statups = pickup_awakes(cards[own_no], "status_up", legend_skill);
	// 自身ステアップの反映
	$.each(own_statups, function (n, e) {
		nows[own_no].maxhp += e.up_hp;
		nows[own_no].nowhp += e.up_hp;
		nows[own_no].atk += e.up_atk;
	});
	// 味方ステアップの反映
	$.each(ally_statups, function (n, e) {
		for (var t = 0; t < cards.length; t++) {
			if (e.attr[cards[t].attr[0]] > 0 && check_spec_inarray(e.spec, cards[t].species)) {
				nows[t].maxhp += e.up_hp;
				nows[t].nowhp += e.up_hp;
				nows[t].atk += e.up_atk;
			}
		}
	});
}

// L時の潜在能力を解除する
function minus_legend_awake(card, nows) {


}

// ファストがいくつついているかを返却する
function has_fastnum(card) {
	var turn = 0;
	// ss_fastについて取得(L時は考慮する必要がないため第三引数はfalse固定)
	var ss_awakes = pickup_awakes(card, "ss_fast", false);
	for (var i = 0; i < ss_awakes.length; i++) {
		turn += ss_awakes[i].turn;
	}
	return turn;
}