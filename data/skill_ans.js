// -------------------------
// �X�L��(AS)
// -------------------------
// ��{�\��(AS)
// type: 1(�U��), 2(�G���n���X), 3(��)
// isall: [�U�����̂ݎQ��]true(�S��), false(�P��)
// atkn: [�U�����̂ݎQ��](�U����)
// rate: �U��or�񕜔{��
// chain: AS����������Œ�`�F�C����
// attr: AS����������Ώۂ̑���
// spec: AS����������Ώۂ̎푰
// �ȏ�̃f�[�^���ЂƂ܂Ƃ߂ɂ������̂�1�܂��͕����ԋp���A
// ���ꂼ��̏ꍇ�ɂ����Č��؁A�l���ł��傫�����̂��g�p����
// �l���Q�Əo���Ȃ��ꍇ(AS������/�������U�̑ΏۂłȂ��Ȃ�)��100%�Ƃ��Ĉ���
// -------------------------
// �`�F�C���A�^�b�J�[(rate: ����, ch: �����`�F�C����)
function ChainAttack(rate, ch) {
	return [
		{
			type: 1,
			isall: false,
			atkn: 1,
			rate: rate,
			chain: ch,
			attr: [1, 1, 1, 1, 1],
<<<<<<< HEAD
<<<<<<< HEAD
			spec: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
=======
			spec: create_specs(1),
>>>>>>> e22626d... 潜在能力関連の整備
=======
			spec: create_specs(1),
>>>>>>> 447b73f... 潜在能力枠組み作成,
		}
	];
}

// �`�F�C���A���A�^�b�J�[(rate: ����, ch: �����`�F�C����, n: �U����)
function ChainDualAttack(rate, ch, n) {
	return [
		{
			type: 1,
			isall: false,
			atkn: n,
			rate: rate,
			chain: ch,
			attr: [1, 1, 1, 1, 1],
<<<<<<< HEAD
<<<<<<< HEAD
			spec: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
=======
			spec: create_specs(1),
>>>>>>> e22626d... 潜在能力関連の整備
=======
			spec: create_specs(1),
>>>>>>> 447b73f... 潜在能力枠組み作成,
		}
	];
}

// �������U(rate: ����, ch: �����`�F�C����, attr: �Ώۑ���)
function ChainAttrAttack(rate, ch, attr) {
	return [
		{
			type: 1,
			isall: false,
			atkn: 1,
			rate: rate,
			chain: ch,
			attr: attr,
<<<<<<< HEAD
<<<<<<< HEAD
			spec: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
=======
			spec: create_specs(1),
>>>>>>> e22626d... 潜在能力関連の整備
=======
			spec: create_specs(1),
>>>>>>> 447b73f... 潜在能力枠組み作成,
		}
	];
}

// �푰���U(rate: ����, ch: �����`�F�C����, spec: �Ώێ푰)
function ChainSpecAttack(rate, ch, spec) {
	return [
		{
			type: 1,
			isall: false,
			atkn: 1,
			rate: rate,
			chain: ch,
			attr: [1, 1, 1, 1, 1],
			spec: spec,
		}
	];
}

// �������U�A��(rate: ����, ch: �����`�F�C����, n: �U����, attr: �Ώۑ���)
function ChainDualAttrAttack(rate, ch, n, attr) {
	return [
		{
			type: 1,
			isall: false,
			atkn: n,
			rate: rate,
			chain: ch,
			attr: attr,
<<<<<<< HEAD
<<<<<<< HEAD
			spec: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
=======
			spec: create_specs(1),
>>>>>>> e22626d... 潜在能力関連の整備
=======
			spec: create_specs(1),
>>>>>>> 447b73f... 潜在能力枠組み作成,
		}
	];
}

// �`�F�C���S�̍U��(rate: ����, ch: �����`�F�C����)
function ChainAllAttack(rate, ch) {
	return [
		{
			type: 1,
			isall: true,
			atkn: 1,
			rate: rate,
			chain: ch,
			attr: [1, 1, 1, 1, 1],
<<<<<<< HEAD
<<<<<<< HEAD
			spec: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
=======
			spec: create_specs(1),
>>>>>>> e22626d... 潜在能力関連の整備
=======
			spec: create_specs(1),
>>>>>>> 447b73f... 潜在能力枠組み作成,
		}
	];
}

// -------
// ��(rate: ����, attr: �񕜂��鑮��)
function Heal(rate, attr) {
	return [
		{
			type: 3,
			rate: rate,
			chain: 0,
			attr: attr,
<<<<<<< HEAD
<<<<<<< HEAD
			spec: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
=======
			spec: create_specs(1),
>>>>>>> e22626d... 潜在能力関連の整備
=======
			spec: create_specs(1),
>>>>>>> 447b73f... 潜在能力枠組み作成,
		}
	];
}
