// ?�ȉ���URL�𐶐�����(check: �K�v���ڂ����͂���Ă��邩�m�F����)
function create_url(check){
	// ����No�̔z��
	var nolists = new Array();
	// �`�F�b�N���镶�����͗�(ID)
	var input_ids = ["deck01", "deck02", "deck03", "deck04", "deck05"];
	// No��
	for (var ct = 0; ct < 5; ct++) {
		var input = $("#" + input_ids[ct]).val();
		if (input == "") {
			nolists.push(0);
			continue;
		}
		var card = $.grep(Cards, function (e, i) {
			return e.name == input;
		})[0];
		var number = card !== undefined ? card.cardno : 0;
		nolists.push(number);
	}
	// check����K�v������Ȃ���Ȃ����`�F�b�N
	if (check && (nolists.length <= 0 || quest_id == "")) {
		return null;
	}
	// quest��id�擾
	var quest_id = $("#QstSel").val();
	return "?" + nolists.toString() + "," + quest_id;
}