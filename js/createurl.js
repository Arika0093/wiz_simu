// ?�ȉ���URL�𐶐�����(check: �K�v���ڂ����͂���Ă��邩�m�F����)
function create_url(check) {
	var hasvalue = false;
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
		hasvalue = hasvalue || number != 0;
	}
	// quest��id�擾
	var quest_id = $("#QstSel").val();
	// check����K�v������Ȃ���Ȃ����`�F�b�N
	if (check && (!hasvalue || quest_id == "")) {
		return null;
	}
	return "?" + nolists.toString() + "," + quest_id;
}