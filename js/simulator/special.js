// SS�𔭓�����
function ss_push(n) {
	var card = Field.Allys.Deck[n];
	var now = Field.Allys.Now[n];
	var is_l = is_legendmode(card, now);
	var ss = is_l ? card.ss2 : card.ss1;
	var ss_rst = true;
	// SS��ł�
	Field.log_push("Unit[" + (n + 1) + "]: SS����");
	if (ss.proc != null) {
		for (var i = 0; i < ss.proc.length; i++) {
			ss_rst = ss.proc[i](Field, n);
		}
	}
	// ���������Ȃ�
	if (ss_rst) {
		// SS���ʊm�F
		ss_effect_check(false);
		// L��ԂȂ�L���݂�����
		if (is_l) {
			minus_legend_awake(Field.Allys.Deck, Field.Allys.Now, n);
			now.islegend = false;
			Field.log_push("Unit[" + (n + 1) + "]: L���[�h����");
		}
		// SS�^�[�������Z�b�g
		now.ss_current = 0;
		now.ss_isfirst = false;
		now.ss_isboost = false;
		// �S�Ŋm�F
		if (allkill_check(true)) {
			nextturn();
		}
		// [�i��]���g���Ȃ��悤��
		Field_log._removeover(Field.Status.totalturn);
		// �ĕ\��
		sim_show();
	} else {
		// failed
		alert("SS�𔭓����Ă����ʂ𓾂��܂���B");
	}
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

// ���ʂ̌p���m�F���s��
function ss_effect_check(is_turn_move) {
	for (var i = 0; i < Field.Allys.Deck.length; i++) {
		var now = Field.Allys.Now[i];
		for (var te = 0; te < now.turn_effect.length; te++) {
			var turneff = now.turn_effect[te];
			// ����type���������݂��V���������d���s�Ȃ�ŏ��̗v�f������
			var duals = $.grep(now.turn_effect, function (e) {
				return (e.type == turneff.type) && (!turneff.isdual);
			});
			if (duals.length >= 2) {
				now.turn_effect.splice(now.turn_effect.indexOf(duals[0]), 1);
				continue;
			}
			if (turneff.lim_turn >= 0 && (!turneff._notfirst || is_turn_move)) {
				// ����
				var prm = (!turneff._notfirst ? 1 : Math.min(turneff.lim_turn - 1, 0));
				turneff.effect(Field, prm, i);
				turneff._notfirst = true;
			}
			if (turneff.lim_turn == 0) {
				// �c��^�[����0�Ȃ珜�O
				now.turn_effect.splice(te, 1);
				te--;
			}
		}
	}
}