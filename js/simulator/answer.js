// �𓚂����Ƃ��̏���
function panel(attr) {
	var is_allkill = true;
	// �����듚���Ă��Ȃ�`�F�C����؂�
	if (attr.length <= 0) {
		Allys.Status.chain = 0;
	} else {
		// �S�̂ɂ��ď���
		Allys.Status.chain += 1;
		// �e����ɂ��ď���
		for (var i = 0; i < Allys.Deck.length; i++) {
			// AS����
			answer_skill(i, attr);
			// SS�`���[�W��1���₷
			Allys.Now[i].ss_current += 1;
		}
	}
	// �G�̏���
	for (var i = 0; i < Enemys.Data[Allys.Status.nowbattle - 1].enemy.length; i++) {
		// �S���̓G��|���Ă邩�ǂ������肷��
		is_allkill = (is_allkill && Enemys.Data[Allys.Status.nowbattle - 1].enemy[i].nowhp == 0);
	}
	// �S�Ă̓G��|���Ă�����
	if (is_allkill) {
		// ���ɐi��
		Allys.Status.nowbattle += 1;
		Allys.Status.durturn.push(Allys.Status.nowturn);
		Allys.Status.nowturn = 0;
	}
	// �^�[���ǉ�
	Allys.Status.nowturn += 1;
	Allys.Status.totalturn += 1;
	// �\��
	sim_show();
}

// �A���T�[�X�L���̏���
function answer_skill(no, attr) {
	// �J�[�h���
	var card = Allys.Deck[no];
	var al_now = Allys.Now[no];
	// AS�擾
	var ASkill = is_legendmode(card, al_now) ? card.AS2 : card.AS1;
	// ���񂾃p�l���F�Ƒ����̂ǂꂩ����v���Ă��邩�m�F
	var is_match_attr = $.grep(attr, function (e) {
		return e == card.attr[0] || e == card.attr[1];
	}).length != 0;
	if (is_match_attr) {
		// �G���n�̏���

		// �U���X�L���̏���

		// �񕜃X�L���̏���

	}
}

// �U���X�L���̏���
function answer_attack(card, now, as, attr) {
	// ���ꂼ��̑����ɂ��ď������s��
	for (var i = 0; i < 2; i++) {
		// ���������Ȃ珈�����Ȃ�
		if (card.attr[i] === undefined) {
			continue;
		}



	}
}