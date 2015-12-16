// ------------------------------------------------------
// ��{�X�L��
// ------------------------------------------------------
// �ʏ�U��
function Default_as() {
	return [
		{
			type: "attack",
			isall: false,
			atkn: 1,
			rate: 1,
			chain: 0,
			attr: [1, 1, 1, 1, 1],
			spec: create_specs(1),
			cond: function (fld, oi, ei) {
				return true;
			},
		}
	];
}

// ����AS���܂Ƃ߂�
function multi_as(as1) {
	for (var i = 1; i < arguments.length; i++) {
		as1.concat(arguments[i]);
	}
	return as1;
}

// �����t�^
function add_cond(as, obj) {
	for (var i = 0; i < as.length; i++) {
		for (var key in obj) {
			if (obj[key]) {
				as[i][key] = obj[key];
			}
		}
	}
	return as;
}

// ------------------------------------------------------
// ��{�U��
// ------------------------------------------------------
// �`�F�C���A�^�b�J�[(rate: ����, ch: �����`�F�C����)
function ChainAttack(rate, ch) {
	return [
		{
			type: "attack",
			isall: false,
			atkn: 1,
			rate: rate,
			chain: ch,
			attr: [1, 1, 1, 1, 1],
			spec: create_specs(1),
			cond: function (fld, oi, ei) {
				return true;
			},
		}
	];
}

// HP������čU������`�F�C���A�^�b�J�[
// (rate: ����, ch: �����`�F�C����, hp: ����HP�̊���)
function ChainAttack_ConsumeHP(rate, ch, hp) {
	return [
		{
			type: "attack",
			isall: false,
			atkn: 1,
			rate: rate,
			chain: ch,
			attr: [1, 1, 1, 1, 1],
			spec: create_specs(1),
			cond: function (fld, oi, ei) {
				return true;
			},
		}
	];
}

// ���[�_�[���ɔ�������`�F�C���A�^�b�J�[
// (rate: ����, ch: �����`�F�C����)
function ChainAttack_Leader(rate, ch) {
	return [
		{
			type: "attack",
			isall: false,
			atkn: 1,
			rate: rate,
			chain: ch,
			attr: [1, 1, 1, 1, 1],
			spec: create_specs(1),
			cond: function (fld, oi, ei) {
				return oi == 0;
			},
		}
	];
}

// �`�F�C���A���A�^�b�J�[(rate: ����, ch: �����`�F�C����, n: �U����)
function ChainDualAttack(rate, ch, n) {
	return [
		{
			type: "attack",
			isall: false,
			atkn: n,
			rate: rate,
			chain: ch,
			attr: [1, 1, 1, 1, 1],
			spec: create_specs(1),
			cond: function (fld, oi, ei) {
				return true;
			},
		}
	];
}

// �������U(rate: ����, ch: �����`�F�C����, attr: �Ώۑ���)
function ChainAttrAttack(rate, ch, attr) {
	return [
		{
			type: "attack",
			isall: false,
			atkn: 1,
			rate: rate,
			chain: ch,
			attr: attr,
			spec: create_specs(1),
			cond: function (fld, oi, ei) {
				return true;
			},
		}
	];
}

// �푰���U(rate: ����, ch: �����`�F�C����, spec: �Ώێ푰)
function ChainSpecAttack(rate, ch, spec) {
	return [
		{
			type: "attack",
			isall: false,
			atkn: 1,
			rate: rate,
			chain: ch,
			attr: [1, 1, 1, 1, 1],
			spec: specific_specs(spec),
			cond: function (fld, oi, ei) {
				return true;
			},
		}
	];
}

// �������U�A��(rate: ����, ch: �����`�F�C����, n: �U����, attr: �Ώۑ���)
function ChainDualAttrAttack(rate, ch, n, attr) {
	return [
		{
			type: "attack",
			isall: false,
			atkn: n,
			rate: rate,
			chain: ch,
			attr: attr,
			spec: create_specs(1),
			cond: function (fld, oi, ei) {
				return true;
			},
		}
	];
}

// �`�F�C���S�̍U��(rate: ����, ch: �����`�F�C����)
function ChainAllAttack(rate, ch) {
	return [
		{
			type: "attack",
			isall: true,
			atkn: 1,
			rate: rate,
			chain: ch,
			attr: [1, 1, 1, 1, 1],
			spec: create_specs(1),
			cond: function (fld, oi, ei) {
				return true;
			},
		}
	];
}

// ------------------------------------------------------
// �`�F�C���G���n���X(rate: ����, attr: �Ώۑ���, ch: �`�F�C��)
function ChainEnhance(rate, attr, ch) {
	return [
		{
			type: "support",
			subtype: "enhance",
			rate: rate,
			chain: ch,
			attr: attr,
			spec: create_specs(1),
			cond: function (fld, i) {
				return true;
			},
		}
	];
}

// ------------------------------------------------------
// ��(rate: ����, attr: �Ώۑ���)
function Heal(rate, attr) {
	return [
		{
			type: "heal",
			rate: rate,
			chain: 0,
			attr: attr,
			spec: create_specs(1),
			cond: function (fld, i) {
				return true;
			},
		}
	];
}

// ------------------------------------------------------
// �e�����
// ------------------------------------------------------
// ���[�_�[��
function when_leader() {
	return function (fld, oi, ei) {
		return index == 0;
	}
}

// �S�̎����X�L��
function ConsumeHP_all(hp) {
	return function (fld, oi, fst) {
		if (fst) {
			for (var i = 0; i < fld.Allys.Deck.length; i++) {
				var now = fld.Allys.Now[i];
				now.nowhp = Math.max(Math.floor(now.nowhp - (now.maxhp * hp)), 0);
			}
		}
	}
}

// �P�̎����X�L��
function ConsumeHP_own(hp) {
	return function (fld, oi, fst) {
		if (fst) {
			var now = fld.Allys.Now[oi];
			now.nowhp = Math.max(Math.floor(now.nowhp - (now.maxhp * hp)), 0);
		}
	}
}
