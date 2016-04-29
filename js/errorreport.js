window.onerror = function(errorMsg, fileName, lineNumber) {
    var errorInfo = {
        'errorMsg'   : errorMsg,           // �G���[���b�Z�[�W
        'fileName'   : fileName,           // �G���[�����������X�N���v�g�̃t�@�C����
        'lineNumber' : lineNumber,         // �G���[�����������s
        'urlDispPage': location.href,      // �G���[�������ɉ{�����Ă��� URL
        'userAgent'  : navigator.userAgent // �G���[�����������N���C�A���g�̃��[�U�G�[�W�F���g
    };
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/errorreport/report.php');
    xhr.setRequestHeader('Content-Type', 'applicatoin/json;charset=UTF-8');
    xhr.send(JSON.stringify(errorInfo));
};