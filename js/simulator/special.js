// SS�𔭓�����
function ss_push(n) {
	var card = Field.Allys.Deck[n];
	var now = Field.Allys.Now[n];
	var is_l = is_legendmode(card, now);
	// SS��ł�
	Field.log_push("Unit[" + (n + 1) + "]: SS����");
	var ss = is_l ? card.ss2 : card.ss1;
	if (ss.proc != null) {
		ss.proc(Field);
	}
	// L��ԂȂ�L���݂�����
	if (is_l) {
		minus_legend_awake(Field.Allys.Deck, Field.Allys.Now, n);
		now.islegend = false;
		Field.log_push("Unit[" + (n + 1) + "]: L���[�h����");
	}
	// SS�^�[�������Z�b�g
	now.ss_current = 0;
	now.ss_isfirst = false;
	// �ĕ\��
	sim_show();
}

// L���[�h�ɓ������^�C�~���O���ǂ����𔻒肷��
function legend_timing_check(cards, nows, index) {
	var is_l = is_legendmode(cards[index], nows[index]);
	var rst = is_l && !nows[index].islegend;
	if (rst) {
		nows[index].islegend = true;
		// L���̐��݂𔽉f������
		add_awake_ally(cards, nows, index, true);
		Field.log_push("Unit[" + (index + 1) + "]: L���[�h");
	}
}

// L���[�h�ɓ����Ă��邩�ǂ����𔻒肷��
function is_legendmode(card, now) {
	return get_ssturn(card, now)[1] == 0;
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