// �𓚂����Ƃ��̏���
function panel(attr) {
	var is_allkill = true;
	// �S�̂ɂ��ď���
	Allys.Status.chain += 1;
	// �e����ɂ��ď���
	for (var i = 0; i < Allys.Deck.length; i++) {
		// AS����
		answer_skill(i);
		// SS�`���[�W��1���₷
		Allys.Now[i].ss_current += 1;
	}
	// �S���̓G��|���Ă邩�ǂ������肷��


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
function answer_skill(no) {



}