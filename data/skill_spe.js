// �g����
// ex1) 10%AS�G���n
// proc: [ss_enhance(0.1)],
// ex2) 50%�S�̎�������100%�G���n
// proc: [damage_ally_all(0.5), ss_enhance(1)]
// -----------------------------------
// �U���n
// -----------------------------------
// �G��SS�_���[�W
function ss_damage(fld, r, atr, atkn, own, tg) {
	var enemy = fld.Enemys.Data[fld.Status.nowbattle - 1].enemy[tg];
	var now = fld.Allys.Now[own];
	var rnd = damage_rand();
	attack_enemy(enemy, now, atr, r, atkn, [atr],
		fld.Status.chain, rnd, own, tg, true);
}

// �G�S�̂Ɏw�葮���̃_���[�W
function ss_damage_all(r, attrs) {
	return function (fld, n) {
		for (var a = 0; a < attrs.length; a++) {
			var atr = attrs[a];
			for (var i = 0; i < fld.Enemys.Data[fld.Status.nowbattle - 1].enemy.length; i++) {
				// �U��
				ss_damage(fld, r, atr, 1, n, i);
			}
		}
		return true;
	};
}

// �G�P�̂Ɏw�葮���̃_���[�W
function ss_damage_s(r, attrs, atkn) {
	return function (fld, n) {
		var enemys = fld.Enemys.Data[fld.Status.nowbattle - 1].enemy;
		for (var an = 0; an < atkn; an++) {
			for (var a = 0; a < attrs.length; a++) {
				var atr = attrs[a];
				// �U��
				ss_damage(fld, r, atr, atkn, n, auto_attack_order(enemys, atr, n));
			}
		}
		return true;
	};
}

// -----------------------------------
// �����T�|�[�g�n
// -----------------------------------
// �S�̃G���n
function ss_enhance_all(p, t) {
	return function (fld, n) {
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			now.turn_effect.push({
				type: "ss_enhance",
				isdual: false,
				turn: t,
				lim_turn: t,
				effect: function (f, v, tg) {
					if (v == 1) {
						f.Allys.Now[tg].ss_enhance = p;
					}
					else if (v == -1) {
						f.Allys.Now[tg].ss_enhance = 0;
					}
				},
			});
		}
		fld.log_push("�����S�̍U����Up(" + (p*100) + "%, " + t + "t)");
		return true;
	};
}

// �P�̃G���n
function ss_enhance_own(p, t) {
	return function (fld, n) {
		var now = fld.Allys.Now[n];
		now.turn_effect.push({
			type: "ss_enhance",
			isdual: false,
			turn: t,
			lim_turn: t,
			effect: function (f, v, tg) {
				if (v == 1) {
					f.Allys.Now[tg].ss_enhance = p;
				}
				else if (v == -1) {
					f.Allys.Now[tg].ss_enhance = 0;
				}
			},
		});
		fld.log_push("Unit[" + (n + 1) + "]: �U����Up(" + (p * 100) + "%, " + t + "t)");
		return true;
	}
}

// �S�̃X�e�A�b�v
function ss_statusup_all(hu, atku, t) {
	return function (fld, n) {
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			now.turn_effect.push({
				type: "ss_statusup",
				isdual: true,
				turn: t,
				lim_turn: t,
				effect: function (f, v, tg) {
					var nowtg = f.Allys.Now[tg];
					if (v == 1) {
						nowtg.maxhp += hu;
						nowtg.nowhp += hu;
						nowtg.atk += atku;
					}
					else if (v == -1) {
						nowtg.maxhp -= hu;
						nowtg.nowhp = Math.min(f.Allys.Now[tg].nowhp, f.Allys.Now[tg].maxhp);
						nowtg.atk -= atku;
					}
				},
			});
		}
		fld.log_push("�����S�̃X�e�[�^�XUp(HP:" + hu + ", ATK: " + atku +
			(t != -1 ? (", " + t + "t") : "") + ")");
		return true;
	};
}

// �P����
function ss_heal(p) {
	return function (fld, n) {
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			if (now.nowhp > 0) {
				now.nowhp = Math.min(now.nowhp + (now.maxhp * p), now.maxhp);
			}
		}
		fld.log_push("�����S��HP��(" + (p * 100) + "%)");
		return true;
	};
}

// -----------------------------------
// ���̑��⏕�n
// -----------------------------------
// �p�l���t�^����
function panel_addition(dsc, fc) {
	return function (fld, n) {
		fld.Status.panel_add.push({
			desc: dsc,
			func: fc,
		});
		return true;
	};
}

// �U���̓A�b�v�p�l���t�^����
function panel_attackup(p) {
	var dsc = "�U���̓A�b�v(" + (p * 100) + "%)";
	return panel_addition(dsc, function (fld) {
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			now.as_enhance = (now.as_enhance ? now.as_enhance : 0) + p;
		}
		fld.log_push("�p�l���t�^����: " + dsc);
	});
}

// �`�F�C���v���X�p�l���t�^����
function panel_chainplus(p) {
	var dsc = "�`�F�C���v���X(+" + p + ")";
	return panel_addition(dsc, function (fld) {
		if (Field.Status.chain_status >= 0) {
			fld.Status.chain += p;
			fld.log_push("�p�l���t�^����: " + dsc);
		}
	});
}

// -----------------------------------
// �f�����b�g�n
// -----------------------------------
// �����Ɋ���p�̃_���[�W��^����
function consume_own(p) {
	return function (fld, n) {
		var now = fld.Allys.Now[n];
		var dmg = Math.floor(p * now.maxhp);
		now.nowhp = Math.max(now.nowhp - dmg, 0);
		fld.log_push("Unit[" + (n+1) + "]: ����(" + (p * 100) + "%)");
		return true;
	};
}

// �����S�̂Ɋ���p�̃_���[�W��^����
function consume_all(p) {
	return function (fld, n) {
		var ct = 0;
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			var dmg = Math.floor(p * now.maxhp);
			if (now.nowhp > 0) {
				now.nowhp = Math.max(now.nowhp - dmg, 0);
				ct++;
			}
		}
		fld.log_push("�S�̎���(" + (p * 100) + "%)");
		return ct;
	};
}
