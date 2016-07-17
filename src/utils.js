exports.textToArray = function(text) {
    return text.trim().split(/\r?\n/);
};
exports.checkSyntax = function(lines) {
    const reg = /[1-9][0-9]*(\s)(.+)(\sat\s+)[0-9]*[.][0-9][0-9]/;
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

exports.calculateTaxes= function(price,rate){
  const percentage=(price*rate)/100;
  return (Math.ceil(percentage*20)/20);
};
