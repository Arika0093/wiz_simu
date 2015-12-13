// �w�葮���ő�����U��
//	enemy: �G�f�[�^, now: ���g�̃f�[�^, atk_atr: �U������, as: �U��AS,
//	pn: ���񂾃p�l��, ch: �`�F�C����, rnd: ����
function as_attack_enemy(enemy, now, atk_atr, as, pn, ch, rnd) {
	var d = 0;
	// �G���n
	var as_enh = now.as_enhance !== undefined ? now.as_enhance : 0;
	var ss_enh = now.ss_enhance !== undefined ? now.ss_enhance : 0;
	// �U��
	d = (now.atk / 2) * (1 + ch / 100) * rnd / as.atkn;
	// AS�{���A�G���n
	d *= (as.rate + as_enh + ss_enh);
	// �p�l��
	d *= (pn.indexOf(atk_atr) >= 0 ? 1 : 0.5);
	// �����l��
	d *= attr_magnification(atk_atr, enemy.attr);
	// �؂�̂�
	d = Math.floor(d);

	// HP������
	enemy.nowhp = Math.max(enemy.nowhp - d, 0);

	return d;
}

// �����L���W����Ԃ�
function attr_magnification(atk_atr, def_atr) {
	// �����Ƃ��ΐ���
	if (atk_atr <= 2 && def_atr <= 2) {
		var magn = [1, 1.5, 0.5];
		return magn[(atk_atr - def_atr + 3)%3];
	}
	// �����Ƃ�����
	else if (atk_atr >= 3 && def_atr >= 3) {
		return (atk_atr != def_atr ? 1.5 : 1);
	}
	// ����ȊO�Ȃ�1
	else {
		return 1;
	}
}