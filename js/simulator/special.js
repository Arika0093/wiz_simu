// SS�𔭓�����
function ss_push(n) {

	// SS�^�[�������Z�b�g
	Allys.Now[n].ss_current = 0;
	Allys.Now[n].ss_isfirst = false;
	// �ĕ\��
	sim_show();
}

// L���[�h�ɓ����Ă��邩�ǂ����𔻒肷��
function is_legendmode(card, ally_n) {
	return get_ssturn(card, ally_n)[1] == 0;
}

// SS���c�艽�^�[���őłĂ邩��z��ŕԂ�
function get_ssturn(card, ally_n) {
	// SS1 default
	var ss1_def = card.ss1.turn;
	// SS2 default
	var ss2_def = (card.islegend ? card.ss2.turn : undefined);
	// SS�`���[�W�^�[��
	var cg = ally_n.ss_current;
	// �������ĂȂ����ǂ���
	var fst = ally_n.ss_isfirst;
	// �v�Z
	var ss1 = Math.max(ss1_def - cg - (fst ? has_fastnum(card) : 0), 0);
	var ss2 = ss2_def !== undefined ? (Math.max(ss2_def - cg - (fst ? has_fastnum(card) : 0), 0)) : undefined;
	// �ԋp
	return [ss1, ss2];
}