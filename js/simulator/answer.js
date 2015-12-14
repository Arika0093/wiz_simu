// �𓚂����Ƃ��̏���
function panel(attr) {
	if (attr.length <= 0) {
		// �듚����
		if (Field.Status.chain_status <= 0) {
			Field.Status.chain = 0;
		}
		Field.log_push("�듚");
	} else {
		// �`�F�C��+1
		if (Field.Status.chain_status >= 0) {
			Field.Status.chain += 1;
		}
		// �t�^���ʎ��s
		var pnladd = Number($("#panel_add_sel").val());
		if (pnladd != 0) {
			Field.Status.panel_add[pnladd - 1].func(Field);
		}
		// �G���n����
		answer_skill(pickup_answerskills(attr, "support"), attr);
		// �U��
		var atk_skill = pickup_answerskills(attr, "attack");
		// �f�t�H��AS��ǉ�����
		$.each(atk_skill, function (i, e) {
			if (e != null) {
				atk_skill[i].unshift(Default_as()[0]);
			}
		});
		answer_skill(atk_skill, attr);
		// ��
		answer_skill(pickup_answerskills(attr, "heal"), attr);
		// �e�����SS�`���[�W��1���₷
		for (var i = 0; i < Field.Allys.Deck.length; i++) {
			var now = Field.Allys.Now[i];
			if (now.nowhp > 0) {
				now.ss_current += 1;
				// L����
				legend_timing_check(Field.Allys.Deck, Field.Allys.Now, i);
			}
		}
	}
	// �G�̏���
	
	// �S�Ŋm�F
	allkill_check(false);
	Field.Status.totalturn += 1;
	Field.Status.nowturn += 1;
	// Field���O�o��
	Field_log.save(Field.Status.totalturn, Field);
	// �\��
	sim_show();
}

// �A���T�[�X�L�����瓥�񂾃p�l���ɉ���������v�f�݂̂𔲂��o��
function pickup_answerskills(attr, type, subtype) {
	var result = [];
	for (var i = 0; i < Field.Allys.Deck.length; i++) {
		// �J�[�h���
		var card = Field.Allys.Deck[i];
		var al_now = Field.Allys.Now[i];
		// ����ł�����null������
		if (al_now.nowhp <= 0) {
			result.push(null);
			continue;
		}
		// ���񂾃p�l���F�Ƒ����̂ǂꂩ�Ƃň�v���Ȃ��ꍇnull������
		var is_match_attr = $.grep(attr, function (t) {
			return t == card.attr[0] || t == card.attr[1];
		}).length != 0;
		if (!is_match_attr) {
			result.push(null);
			continue;
		}

		// AS�擾
		var ASkill = is_legendmode(card, al_now) ? card.as2 : card.as1;
		// �����o��
		result.push($.grep(ASkill.proc, function (e) {
			return (e.type == type) && (subtype !== undefined ? e.subtype == subtype : true);
		}));
	}
	return result;
}

// �A���T�[�X�L���̏���
function answer_skill(as_arr, panel) {
	for (var i = 0; i < as_arr.length; i++) {
		// AS���Ȃ��Ȃ珈�����Ȃ�
		if (as_arr[i] == null || as_arr[i].length <= 0) { continue; }

		var card = Field.Allys.Deck[i];
		var now = Field.Allys.Now[i];
		var enemy_dat = Field.Enemys.Data[Field.Status.nowbattle - 1].enemy;
		var targ = Number($("#attack_target_sel").val());
		var rnd = Number($("#attack_rand_sel").val());
		// ��ނŕ���
		switch (as_arr[i][0].type) {
			case "attack":
				answer_attack(card, now, enemy_dat, as_arr[i], panel, targ, rnd, i);
				break;
			case "support":
				answer_enhance(as_arr[i]);
				break;
			case "heal":
				answer_heal(as_arr[i]);
				break;
		}
	}
}

// �U���̏���
function answer_attack(card, now, enemy, as, attr, t, r, index) {
	// �G���ꂼ��ɑ΂��ėL����AS��index�̔z��
	var as_pos = [];
	// �G���ꂼ��ɂ��ď����̗ǂ�AS�����o��
	for (var ai = 0; ai < as.length; ai++) {
		var chain = Field.Status.chain;
		for (var ei = 0; ei < enemy.length; ei++) {
			var rate_n = (is_answer_target(as[ai], chain, enemy[ei].attr, enemy[ei].spec, index, ei) ? as[ai].rate : 0);
			var rate_b = (as_pos[ei] !== undefined ? as[as_pos[ei]].rate : 0);
			as_pos[ei] = (rate_n >= rate_b ? ai : as_pos[ei]);
		}
	}
	// �U�����̑���(���������̐��삪���p�l���𓥂񂾎��ɉ�����U������I�ȃA��)
	var atk_attr = [];
	atk_attr[0] = (attr.indexOf(card.attr[0]) >= 0) ? card.attr[0] : card.attr[1];
	atk_attr[1] = (attr.indexOf(card.attr[0]) >= 0) ? card.attr[1] : card.attr[0];
	// �A���񐔕��J��Ԃ�
	for (var ati = 0; ati < as[as_pos[0]].atkn; ati++) {
		// ���g�̂��ꂼ��̑����ɂ��ď������s��
		for (var at = 0; at < 2; at++) {
			// ���������Ȃ珈�����Ȃ�
			if (atk_attr[at] === undefined || atk_attr[at] == -1) {
				continue;
			}
			// �ǂ̓G���U�����邩
			var targ = ((t != -1 && enemy[t] !== undefined && enemy[t].nowhp > 0) ?
				t : auto_attack_order(enemy, atk_attr[at]));
			// �e����
			var atr = atk_attr[at];
			var atk_as = as[as_pos[targ]]
			var en = enemy[targ];
			var ch = Field.Status.chain;
			// �S�̍U���Ȃ�G�S�̂Ƀ_���[�W�v�Z
			if (atk_as.isall) {
				for (var tg = 0; tg < enemy.length; tg++) {
					if (enemy[tg].nowhp <= 0) { continue; }
					// ����
					var rnd = (r != -1 ? r : 0.9 + (Math.random() * 0.2))
					// �_���[�W�v�Z
					var damage = as_attack_enemy(enemy[tg], now, atr, atk_as, attr, ch, rnd, index, tg);
				}
			} else {
				// ����
				var rnd = (r != -1 ? r : 0.9 + (Math.random() * 0.2))
				// �_���[�W�v�Z
				var damage = as_attack_enemy(en, now, atr, atk_as, attr, ch, rnd, index, targ);
			}
		}
	}
}

// �G���n�X�L���̏���
function answer_enhance(as) {
	for (var ci = 0; ci < Field.Allys.Deck.length; ci++) {
		var rate = 0;
		var card = Field.Allys.Deck[ci];
		var now = Field.Allys.Now[ci];
		var chain = Field.Status.chain;
		// �ő�̒l�����o��
		for (var ai = 0; ai < as.length; ai++) {
			rate = Math.max(rate,
				(is_answer_target(as[ai], chain, card.attr[0], card.species, ci) ? as[ai].rate : 0)
			);
		}
		// �G���n�l�ǉ�
		var bef_enh = now.as_enhance ? now.as_enhance : 0;
		now.as_enhance = bef_enh + rate;
	}
}

// �񕜃X�L���̏���
function answer_heal(as) {
	for (var ci = 0; ci < Field.Allys.Deck.length; ci++) {
		var rate = 0;
		var card = Field.Allys.Deck[ci];
		var now = Field.Allys.Now[ci];
		var chain = Field.Status.chain;
		// �ő�̒l�����o��
		for (var ai = 0; ai < as.length; ai++) {
			rate = Math.max(rate,
				(is_answer_target(as[ai], chain, card.attr[0], card.species, ci) ? as[ai].rate : 0)
			);
		}
		if (rate > 0) {
			// ��
			var heal_val = Math.floor(rate * now.maxhp);
			var before = now.nowhp;
			now.nowhp = Math.min(now.maxhp, now.nowhp + heal_val);
			Field.log_push("Unit[" + (ci + 1) + "]: HP��(HP: " + before + "��" + now.nowhp + ")");
		}
	}
}

// AS�̑ΏۂɂȂ邩�ǂ������m�F����
function is_answer_target(as, ch, tg_attr, tg_spec, own_i, enm_i) {
	var rst = true;
	// �`�F�C���m�F
	rst = rst && (ch >= as.chain);
	// �����m�F
	rst = rst && (as.attr[tg_attr] == 1);
	// �푰�m�F
	rst = rst && (check_spec_inarray(as.spec, tg_spec));
	// �����m�F
	rst = rst && (as.cond(Field, own_i, enm_i));
	return rst;
}