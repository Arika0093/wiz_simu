// �t�@�X�g�X�L��
function Fastskill(t) {
	return {
		type: "ss_fast",
		turn: t,			// �Z�k�^�[����
	}
}

// �X�e�[�^�X�A�b�v
function Statusup(hp, atk) {
	return {
		type: "own_status_up",
		up_hp: hp,
		up_atk: atk,
	};
}

// ���������X�e�A�b�v
function Attr_statusup(hp, atk, attrs) {
	return {
		type: "status_up",
		attr: attrs,
		spec: create_specs(1),
		up_hp: hp,
		up_atk: atk,
	};
}

// �����푰�X�e�A�b�v
function Spec_statusup(hp, atk, specs) {
	return {
		type: "status_up",
		attr: [1, 1, 1, 1, 1],
		spec: specific_specs(specs),
		up_hp: hp,
		up_atk: atk,
	};
}

// �㎀�ꐶ(Narrow escape from the jaw of death)
function NEFTJOD(perc) {
	return {
		type: "neftjod",
		perc: perc,
	};
}

// �p�l���u�[�X�g
function Panel_boost(attrs, efv) {
	return {
		type: "panel_boost",
		attr: attrs,
		efv: efv,
	};
}

// �����y��
function Attr_relief(attrs, perc) {
	return {
		type: "attr_relief",
		attr: attrs,
		perc: perc,
	};
}

// ����
function Heal_afterbattle(perc) {
	return {
		type: "heal_after_battle",
		perc: perc,
	};
}