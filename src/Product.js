const categories = require('./categories.json');
module.exports = class Product {
    constructor(line) {
        this.line = line;
        this._extractData();
    }
    _extractData() {
        const regEx = /(\s)(.+)\sat\s+([0-9]*[.][0-9][0-9])/;
        const [quantity, space, itemText, price] = this.line.split(regEx);
        const name = this._extractName(itemText);
        this.quantity = parseInt(quantity);
        this.price = parseFloat(price);
        this.itemText = itemText;
        this.name = name;
        this.imported = this._isImported(itemText);
        this.exempt = this.isExempt(name);
    }
    _extractName(itemText) {
        if (itemText.includes(' of ')) {
            return itemText.split(/\sof\s(.+)/)[1];
        }

        return itemText;
    }
    _isImported(itemText) {
        return itemText.includes('imported ');
    }
    isExempt(productName) {
        for (var category in categories) {
            if (categories.hasOwnProperty(category)) {
                if (categories[category].includes(productName)) {
                    return true;
                }
            }
        }
        return false;
    }
};
