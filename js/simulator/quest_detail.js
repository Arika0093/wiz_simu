// 読み込み時に実行
$(function () {
	// get query
	var id = location.search.indexOf("?id=") == 0 ?			location.search.substr(4) : null;
	var genre = location.search.indexOf("?genre=") == 0 ?	location.search.substr(7) : null;
	var tag = location.search.indexOf("?tag=") == 0 ?		location.search.substr(5) : null;

	if (id) {
		makeQD(id);
	} else {
		makeList(genre);
	}
});

// クエスト一覧を表示
function makeList(genre) {
	// match and generate html
	var rst_html = "<dt>Category: " + (genre || "ALL QUEST") + "</dt><dd class='left_min'>";
	var rst = $.grep(Quests, function (Quest, QuestNum) {
		// match check
		if (genre && Quest.category != genre) {
			return false;
		}
		rst_html += "<a class='genre_link' href='/simulator/quest/?id=" + Quest.id + "'>" + Quest.name + "</a>";
		return true;
	});
	rst_html += "</dd>";
	if (rst.length > 0) {
		$("#result").html(rst_html);
	} else {
		var h = "<dl class='List'><dt>ERROR OCCURRED.</dt><dd>存在しないクエストが指定されました。</dd></dl>";
		$("#result").html(h);
	}
}

// クエストの詳細を表示
function makeQD(id) {
	var resStr = ""
	var rst = $.grep(Quests, function (Quest, QuestNum) {
		// match check
		if (id && Quest.id != id) {
			return false;
		}
		// generate html
		resStr += "<dt>" + Quest.name + "</dt>"
		Quest.data.forEach(function (Battle, BattleNum) {
			resStr += "<dd class='left_min'>" +
				"<p class='battle_num'>" + Battle.appearance + "戦目</p><div class='battle_d'>"
			Battle.enemy.forEach(function (Enemy, EnemyNum) {
				var move = Enemy.move;
				// add main
				var myid = "Q" + QuestNum + "B" + BattleNum;
				resStr += "<div class='etd clearfix' id=" + myid + ">";
				resStr += "<img class='eico" + (Enemy.hp < 100 ? " impregnable" : "") +
					"' src=" + get_image_url_b(Enemy.imageno) + ">";
				resStr += "<div class='e_name'>" + Enemy.name + "</div>";
				resStr += "<p class='e_attrspec'>" + get_attr_string(Enemy.attr) +
					" / " + get_spec_string(Enemy.spec) + "</p>";
				resStr += "<p class='e_hp'>" + addform("HP", comma3(Enemy.hp)) + "</p>";
				// add move
				if (move != undefined) {
					resStr += "<p class='em_fst'>" + addform("初回", move.turn, "T") +
						" / " + addform("行動周期", move.wait, "T") + "</p>"
					resStr += "<div class='e_move'>" + moveappear(move, "on_popup", "先制攻撃")
					resStr += moveappear(move, "on_move", "通常時")
					resStr += moveappear(move, "on_angry", "怒った時")
					resStr += moveappear(move, "on_move_angry", "怒り後") +"</div>"
				}
				resStr += "</div>"
			})
			resStr += "</div>"
			resStr += "<a class='back_category' href='/simulator/quest/?genre=" +
				Quest.category + "'>カテゴリ一覧に戻る</a>";
		})
		resStr += "</dd>";
		return true;
	});
	if (rst.length > 0) {
		$("#result").html(resStr);
	} else {
		var h = "<dl class='List'><dt>ERROR OCCURRED.</dt><dd>存在しないクエストが指定されました。</dd></dl>";
		$("#result").html(h);
	}
}

// on_hogehogeの全行動を返す
function moveappear(moveObj, key, title) {
	var tmpObj = moveObj[key]
	var impTag = ["分裂待機", "鉄壁", "スキル反射", "チェイン解除", "AS封印", "怒り", "属性変化"];
	var strBody = ""
	var strTitle = title == undefined ? "" : "<b class='em_title " + key +"'>" + title + "：</b><br>"
	if (tmpObj != undefined) {
		tmpObj.forEach(function (ss) {
			if (ss != undefined) {
				var isimp = $.grep(impTag, function (e) {
					return ss.mdesc.indexOf(e) >= 0;
				}).length > 0;

				strBody += (isimp ? "<b class='imp_move'>" : "") + ss.mdesc +
					(isimp ? "</b>" : "") + "<br>";
			}
		})
	}
	return strBody == "" ? "" :
		"<div class='clmn " + key + "'>" + strTitle + strBody + "</div>";
}

// テキストを成形する
function addform(title, param, unit, nobr) {
	var tmpstr = ""
	tmpstr = title == "" ? tmpstr : tmpstr + "<b>" + title + "：</b>"
	if (param == undefined) { return "" }
	tmpstr += param
	tmpstr = unit == undefined ? tmpstr : tmpstr + unit
	//tmpstr = (nobr != undefined || nobr == 1) ? tmpstr : tmpstr + "<br>"
	return tmpstr
}
