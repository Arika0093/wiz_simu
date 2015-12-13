// -------------------------
// �X�L��(AS)
// -------------------------
// ��{�\��(AS)
// type: attack(�U��), support(�G���n���X), heal(��)
// isall: [�U�����̂ݎQ��]true(�S��), false(�P��)
// atkn: [�U�����̂ݎQ��](�U����)
// rate: �U��or�񕜔{��
// chain: AS����������Œ�`�F�C����
// attr: AS����������Ώۂ̑���
// spec: AS����������Ώۂ̎푰
// cond: �ڍׂȏ������w�肷��ꍇ�Ɏg�p����
//  	(field: Field�̎Q�Ɠn��, oi: ���g��index, ei: �G��index)
// �ȏ�̃f�[�^���ЂƂ܂Ƃ߂ɂ������̂�1�܂��͕����ԋp���A
// ���ꂼ��̏ꍇ�ɂ����Č��؁A�l���ł��傫�����̂��g�p����
// �l���Q�Əo���Ȃ��ꍇ(AS������/�������U�̑ΏۂłȂ��Ȃ�)��100%�Ƃ��Ĉ���
// -------------------------
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
			cond: function (field, oi, ei) {
				return true;
			},
		}
	];
}

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
			cond: function (field, oi, ei) {
				return true;
			},
		}
	];
}

// �`�F�C���A�^�b�J�[/���`�F�C���ł���ɃA�b�v
//	(rate: ����, ch: �����`�F�C����, rate_a: ����2, ch_a: �����`�F�C��2)
function ChainAttack_plus(rate, ch, rate_a, ch_a) {
	return [
		{
			type: "attack",
			isall: false,
			atkn: 1,
			rate: rate,
			chain: ch,
			attr: [1, 1, 1, 1, 1],
			spec: create_specs(1),
			cond: function (field, oi, ei) {
				return true;
			},
		},
		{
			type: "attack",
			isall: false,
			atkn: 1,
			rate: rate_a,
			chain: ch_a,
			attr: [1, 1, 1, 1, 1],
			spec: create_specs(1),
			cond: function (field, oi, ei) {
				return true;
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
			cond: function (field, oi, ei) {
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
			cond: function (field, oi, ei) {
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
			spec: spec,
			cond: function (field, oi, ei) {
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
			cond: function (field, oi, ei) {
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
			cond: function (field, oi, ei) {
				return true;
			},
		}
	];
}

// -------
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
			cond: function (field, i) {
				return true;
			},
		}
	];
}

// -------
// ��(rate: ����, attr: �Ώۑ���)
function Heal(rate, attr) {
	return [
		{
			type: "heal",
			rate: rate,
			chain: 0,
			attr: attr,
			spec: create_specs(1),
			cond: function (field, i) {
				return true;
			},
		}
	];
}
