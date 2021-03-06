// 読み込み時に実行
$(function () {
	// get query
	var id = location.search.indexOf("?id=") == 0 ?			location.search.substr(4) : null;
	var genre = location.search.indexOf("?genre=") == 0 ?	location.search.substr(7) : null;

	if (id) {
		makeQD(id);
	} else if(genre && genre != "") {
		makeList(genre, "/simulator/quest/?id=");
	} else {
		makeCategoryList("/simulator/quest/?genre=");
	}
});

// カテゴリ一覧を表示
function makeCategoryList(url) {
	// match and generate html
	var view_genre = "";
	var rst_html = "<dt>Category View</dt><dd class='left_min' id='category_view'>";
	var rst = $.grep(Quests, function (Quest, QuestNum) {
		// match check
		if (Quest.category != view_genre) {
			var ctgr = Quest.category;
			var boss_enms = Quest.data[Quest.data.length - 1].enemy;
			var boss_enm = boss_enms.length >= 2 ? 1 : 0;
			rst_html += "<a class='genre_link' href='" + url + ctgr + "'><img src=" +
			get_image_url(boss_enms[boss_enm].imageno, boss_enms[boss_enm].imageno_prefix) + " class='boss_img'>" +
				(category_jp[ctgr] ? category_jp[ctgr].jp : "") + "</a>";
			view_genre = ctgr;
		}
	});
	rst_html += "</dd>";
	$("#result").html(rst_html);
}

// クエスト一覧を表示
function makeList(genre, url) {
	// match and generate html
	var rst_html = "<dt>Category: " + getCategoryJp(genre) + "</dt><dd class='left_min' id='category_view'>";
	var rst = $.grep(Quests, function (Quest, QuestNum) {
		// match check
		if (genre && Quest.category != genre) {
			return false;
		}
		var boss_enms = Quest.data[Quest.data.length - 1].enemy;
		var boss_enm = boss_enms.length >= 2 ? 1 : 0;
		rst_html += "<a class='genre_link' href='" + url + Quest.id + "'><img src=" +
		get_image_url(boss_enms[boss_enm].imageno, boss_enms[boss_enm].imageno_prefix) + " class='boss_img'>" + Quest.name + "</a>";
		return true;
	});
	rst_html += "</dd>";
	if (rst.length > 0) {
		$("#result").html(rst_html);
	} else {
		var h = "<dt>ERROR OCCURRED.</dt><dd>存在しないクエストが指定されました。</dd>";
		$("#result").html(h);
	}
}

function getCategoryJp(key){
	return category_jp[key] != undefined ? category_jp[key].jp : key
}

// 敵データのHTMLを作成する関数
function genEnemyHTML(Enemy, addclass){
	addclass = addclass || "";
	var move = Enemy.move;
	var resStr = "";
	// add main
	resStr += `<div class='etd ${addclass} clearfix'>`;
	resStr += "<img class='eico_sm" + (Enemy.hp < 100 ? " impregnable" : "") +
		"' src=" + get_image_url(Enemy.imageno, Enemy.imageno_prefix) + ">";
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
		resStr += moveappear(move, "on_move_angry", "怒り後")
		resStr += moveappear(move, "on_dead", "死亡時") + "</div>"
	}
	resStr += "</div>"
	return resStr;
}

// クエストの詳細を表示
function makeQD(id) {
	var resStr = "";
	var rst = $.grep(Quests, function (Quest, QuestNum) {
		// match check
		if (id && Quest.id != id) {
			return false;
		}
		// generate html
		resStr += "<dt>" + Quest.name + "</dt>"
		if(Quest.battle_before){
			resStr += "<dd>クエスト付与効果: "
			$.each(Quest.battle_before, function(i, e){
				resStr += e.desc + ", "
			});
			resStr += "</dd>"
		}
		Quest.data.forEach(function (Battle, BattleNum) {
			var display_index = [0, 3, 1, 4, 2];
			var e_num = Battle.enemy.length;
			resStr += `<dd class='left_min' id='${BattleNum+1}'>` +
				"<p class='battle_num'>" + Battle.appearance + "戦目</p>" +
				`<div class='battle_d enum_style ${e_num > 3 ? "enum5" : "enum3"}'>`;
			for(var i = 0; i < display_index.length; i++) {
				var idx = display_index[i];
				var Enemy = Battle.enemy[idx];
				if(Enemy){
					resStr += genEnemyHTML(Enemy, (e_num > 3 ? (idx < 3 ? "e_front" : "e_back") : ""));
				}
			}
			resStr += "</div>";
			if (BattleNum == Quest.data.length - 1) {
				resStr += "<div class='bcks clearfix'>" +
					"<a class='sim_go back_category' href='#'>試走する</a>" +
					"<a class='back_category' href='/simulator/d?qid=" + Quest.id + "'>みんなの投稿デッキを見る</a>" +
					"<a class='back_category' href='/simulator/quest?genre=" + Quest.category + "'>カテゴリ一覧に戻る</a></div>";
				//resStr += adsence_html("clear:both;");
			}
		})
		resStr += "</dd>";
		if (Quest.revData) {
			Quest.revData.forEach(function (Enemy, EnemyNum) {
				var e_num = Enemy.length;
				resStr += `<dd class='left_min' id='res_${EnemyNum+1}'>` +
					"<p class='battle_num'>復活後</p>" +
					`<div class='battle_d enum_style ${e_num > 3 ? "enum5" : "enum3"}'>`;
				resStr += genEnemyHTML(Enemy);
				resStr += "</div></dd>";
				return true;
			});
		}
		return true;
	});
	if (rst.length > 0) {
		$("#result").html(resStr);
	} else {
		var h = "<dl class='List'><dt>ERROR OCCURRED.</dt><dd>存在しないクエストが指定されました。</dd></dl>";
		$("#result").html(h);
	}
	$("a.sim_go").on("click", function () {
		sim_by_id(id);
		return;
	});
}

// on_hogehogeの全行動を返す
function moveappear(moveObj, key, title) {
	var tmpObj = moveObj[key]
	var impTag = ["分裂待機", "鉄壁", "スキル反射", "チェイン解除", "AS封印", "怒り", "属性変化", "属性反転"];
	var strBody = ""
	var strTitle = title == undefined ? "" : "<b class='em_title " + key +"'>" + title + "：</b><br>"
	if (tmpObj != undefined) {
		tmpObj.forEach(function (ss) {
			if (ss != undefined) {
				var isimp = $.grep(impTag, function (e) {
					if(ss.mdesc != undefined){
						return ss.mdesc.indexOf(e) >= 0;
					}else{
						return "undefined"
					}
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
