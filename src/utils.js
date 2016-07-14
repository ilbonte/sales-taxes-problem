exports.textToArray = function(text) {
    return text.trim().split(/\r?\n/);
};
exports.checkSyntax = function(lines) {
    const reg = /[1-9]+(\s)(.+)(\sat\s+)[0-9]*[.][0-9][0-9]/;
    let obj = {
        isValid: true,
        wrongLines: []
    };
    lines.forEach((line, index) => {
        if (!reg.test(line)) {
            obj.wrongLines.push(index + 1);
            obj.isValid = false;
        }
    });
    return obj;
};
