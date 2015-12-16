// �w�葮���ő�����U��
//	enemy: �G�f�[�^, now: ���g�̃f�[�^, atk_atr: �U������, rate: �{��, atkn: �U����,
//	pn: ���񂾃p�l��, ch: �`�F�C����, rnd: ����, i: �����̔ԍ�, e: �G�̔ԍ�, is_ss: SS���ǂ���
function attack_enemy(enemy, now, atk_atr, rate, atkn, pn, ch, rnd, i, e, is_ss) {
	var d = 0;
	// �G���n
	var as_enh = now.as_enhance ? now.as_enhance : 0;
	var ss_enh = now.ss_enhance ? now.ss_enhance : 0;
	// �U��
	d = (now.atk / (!is_ss ? 2 : 1)) * (1 + ch / 100) * rnd / atkn;
	// AS�{���A�G���n
	d *= (rate + as_enh + ss_enh);
	// �p�l��
	d *= (pn.indexOf(atk_atr) >= 0 ? 1 : 0.5);
	// �����l��
	d *= attr_magnification(atk_atr, enemy.attr);
	// �؂�̂�
	d = Math.floor(d);

	// NowHP������
	enemy.nowhp = Math.max(enemy.nowhp - d, 0);

	Field.log_push("Unit[" + (i + 1) + "]: �G[" + (e + 1) + "]��" +
		Field.Constants.Attr[atk_atr] + "�U��( " + d +
		"�_���[�W)(�c: " + enemy.nowhp + "/" + enemy.hp + ")");
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

// �U�������������Ŏw�肷��
function auto_attack_order(enemys, attr, own_index) {
	// �U���������w�肳��Ă���Ȃ炻������D��
	var tg = Number($("#attack_target_sel").val());
	if (tg != -1 && enemys[tg].nowhp > 0) {
		return tg;
	}
	var enemy_copy = enemys.concat();
	enemy_copy.sort(function (a, b) {
		// �����L��: �~�� / HP: ����
		if (a.nowhp <= 0) { return +1; }
		if (b.nowhp <= 0) { return -1; }
		var mgn_a = attr_magnification(attr, a.attr);
		var mgn_b = attr_magnification(attr, b.attr);
		if (mgn_a < mgn_b) { return +1; }
		if (mgn_a > mgn_b) { return -1; }
		if (a.nowhp < b.nowhp) { return -1; }
		if (a.nowhp > b.nowhp) { return +1; }
		return 0;
	});
	return enemys.indexOf(enemy_copy[0]);
}

// �����𐶐�����
function damage_rand() {
	r = Number($("#attack_rand_sel").val());
	return (r != -1 ? r : 0.9 + (Math.random() * 0.2));
}