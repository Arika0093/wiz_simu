<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 447b73f... 潜在能力枠組み作成,
﻿// 解答したときの処理
function panel(attr) {
	var is_allkill = true;
	// もし誤答してたならチェインを切る
	if (attr.length <= 0) {
		Allys.Status.chain = 0;
	} else {
		// 全体について処理
		Allys.Status.chain += 1;
		// 各精霊について処理
		for (var i = 0; i < Allys.Deck.length; i++) {
			// AS処理
			answer_skill(i, attr);
			// SSチャージを1増やす
			Allys.Now[i].ss_current += 1;
		}
	}
	// 敵の処理
	for (var i = 0; i < Enemys.Data[Allys.Status.nowbattle - 1].enemy.length; i++) {
		// 全部の敵を倒してるかどうか判定する
		is_allkill = (is_allkill && Enemys.Data[Allys.Status.nowbattle - 1].enemy[i].nowhp == 0);
	}
	// 全ての敵を倒していたら
	if (is_allkill) {
		// 次に進む
<<<<<<< HEAD
>>>>>>> e22626d... 潜在能力関連の整備
=======
>>>>>>> 447b73f... 潜在能力枠組み作成,
		Allys.Status.nowbattle += 1;
		Allys.Status.durturn.push(Allys.Status.nowturn);
		Allys.Status.nowturn = 0;
	}
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 447b73f... 潜在能力枠組み作成,
	// ターン追加
	Allys.Status.nowturn += 1;
	Allys.Status.totalturn += 1;
	// 表示
	sim_show();
}

// アンサースキルの処理
function answer_skill(no, attr) {
	// カード種類
	var card = Allys.Deck[no];
	var al_now = Allys.Now[no];
	// AS取得
	var ASkill = is_legendmode(card, al_now) ? card.AS2 : card.AS1;
	// 踏んだパネル色と属性のどれかが一致しているか確認
<<<<<<< HEAD
>>>>>>> e22626d... 潜在能力関連の整備
=======
>>>>>>> 447b73f... 潜在能力枠組み作成,
	var is_match_attr = $.grep(attr, function (e) {
		return e == card.attr[0] || e == card.attr[1];
	}).length != 0;
	if (is_match_attr) {
<<<<<<< HEAD
<<<<<<< HEAD
		// �G���n�̏���

		// �U���X�L���̏���

		// �񕜃X�L���̏���
=======
=======
>>>>>>> 447b73f... 潜在能力枠組み作成,
		// エンハの処理

		// 攻撃スキルの処理

		// 回復スキルの処理
<<<<<<< HEAD
>>>>>>> e22626d... 潜在能力関連の整備
=======
>>>>>>> 447b73f... 潜在能力枠組み作成,

	}
}

<<<<<<< HEAD
<<<<<<< HEAD
// �U���X�L���̏���
function answer_attack(card, now, as, attr) {
	// ���ꂼ��̑����ɂ��ď������s��
	for (var i = 0; i < 2; i++) {
		// ���������Ȃ珈�����Ȃ�
=======
=======
>>>>>>> 447b73f... 潜在能力枠組み作成,
// 攻撃スキルの処理
function answer_attack(card, now, as, attr) {
	// それぞれの属性について処理を行う
	for (var i = 0; i < 2; i++) {
		// 属性無しなら処理しない
<<<<<<< HEAD
>>>>>>> e22626d... 潜在能力関連の整備
=======
>>>>>>> 447b73f... 潜在能力枠組み作成,
		if (card.attr[i] === undefined) {
			continue;
		}



	}
}