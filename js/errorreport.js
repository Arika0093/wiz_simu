window.onerror = function(errorMsg, fileName, lineNumber) {
    var errorInfo = {
        'errorMsg'   : errorMsg,           // �G���[���b�Z�[�W
        'fileName'   : fileName,           // �G���[�����������X�N���v�g�̃t�@�C����
        'lineNumber' : lineNumber,         // �G���[�����������s
        'urlDispPage': location.href,      // �G���[�������ɉ{�����Ă��� URL
        'userAgent'  : navigator.userAgent // �G���[�����������N���C�A���g�̃��[�U�G�[�W�F���g
    };
	// jQuery���ǂݍ��܂�Ă��邱�Ƃ�O���AJAX�ŏ����܂�
	$.ajax({
		type: "POST",
		contentType: "application/json;charset=UTF-8",
		url: "/errorreport/report.php",
		data: JSON.stringify(errorInfo),
	});
};