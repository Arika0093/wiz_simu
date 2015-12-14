// �g����
// ex1) 10%AS�G���n
// proc: [ss_enhance(0.1)],
// ex2) 50%�S�̎�������100%�G���n
// proc: [damage_ally_all(0.5), ss_enhance(1)]
// -----------------------------------
// �U���n
// -----------------------------------

// -----------------------------------
// �����T�|�[�g�n
// -----------------------------------
// �P���G���n
function ss_enhance(p) {
	return function (fld, n) {
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			now.ss_enhance = (now.ss_enhance ? now.ss_enhance : 0) + p;
		}
		return true;
	};
}

// �P����
function ss_heal(p) {
	return function (fld, n) {
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			now.nowhp = Math.min(now.nowhp + (now.maxhp * p), now.maxhp);
		}
		return true;
	};
}

// -----------------------------------
// �⏕�n
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
function damage_own(p) {
	return function (fld, n) {
		var now = fld.Allys.Now[n];
		var dmg = Math.floor(p * now.maxhp);
		now.nowhp = Math.max(now.nowhp - dmg, 0);
		fld.log_push("Unit[" + (n+1) + "]: ����(" + (p * 100) + "%)");
		return true;
	};
}

// �����S�̂Ɋ���p�̃_���[�W��^����
function damage_ally_all(p) {
	return function (fld, n) {
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			var dmg = Math.floor(p * now.maxhp);
			now.nowhp = Math.max(now.nowhp - dmg, 0);
		}
		fld.log_push("�S�̎���(" + (p * 100) + "%)");
	};
}
