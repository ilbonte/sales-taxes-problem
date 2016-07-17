const categories = require('./categories.json');
const utils = require('./utils.js');
const basic_sales_tax_rate= 10;
const import_duty_rate= 5;
module.exports = class Product {
    constructor(line) {
        this.line = line;
        this.extractData();
    }
    extractData() {
        const regEx = /(\s)(.+)\sat\s+([0-9]*[.][0-9][0-9])/;
        const [quantity, space, itemText, price] = this.line.split(regEx);
        const name = this.extractName(itemText);
        this.quantity = parseInt(quantity);
        this.price = parseFloat(price);
        this.itemText = itemText;
        this.name = name;
        this.imported = this.findIfImported(itemText);
        this.exempt = this.findIfExempt(name);
        this.taxes=0.00;
        this.totalPrice=0.00;
    }
    extractName(itemText) {
        if (itemText.includes(' of ')) {
            itemText= itemText.split(/\sof\s(.+)/)[1];
        }
        if(itemText.includes('imported ')){
          itemText= itemText.replace('imported ','');
        }

        return itemText;
    }
    findIfImported(text) {
        return text.includes('imported ');
    }
    findIfExempt(productName) {
        for (var category in categories) {
            if (categories.hasOwnProperty(category)) {
                if (categories[category].includes(productName)) {
                    return true;
                }
            }
        }
        return false;
    }
    isExempt(){
      return this.exempt;
    }
    isImported(){
      return this.imported;
    }
    calculateTotalPrice(){
      this.taxes=0.00;
      if(!this.isExempt()){
        this.taxes+=utils.calculateTaxes(this.price,basic_sales_tax_rate)*this.quantity;
      }
      if(this.isImported()){
        this.taxes+=utils.calculateTaxes(this.price,import_duty_rate)*this.quantity;
      }
      this.totalPrice=parseFloat(((this.price*this.quantity)+this.taxes).toFixed(2));
      this.taxes=parseFloat(this.taxes.toFixed(2));
    }


};
