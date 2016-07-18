const Product = require('./Product');
const endOfLine = require('os').EOL;
module.exports = class Cart {
    constructor(lines) {
        this.lines = lines;
        this.products = [];
        this.linesToProducts();
        this.totalTaxes = 0;
        this.totalPrice = 0;
    }
    linesToProducts() {
        this.lines.forEach(line => {
            this.products.push(new Product(line));
        });
    }
    calculateTotal() {
        this.products.forEach(product => {
            product.calculateTotalPrice();
            this.totalTaxes += product.taxes;
            this.totalPrice += product.totalPrice;
        });
    }
    getReceipt() {
        let receipt = '';
        this.products.forEach(product => {
            receipt += product.quantity + ' ' + product.itemText + ': ' + product.totalPrice.toFixed(2) + endOfLine;
        });
        receipt += 'Sales Taxes: ' + this.totalTaxes.toFixed(2) + endOfLine;
        receipt += 'Total: ' + this.totalPrice.toFixed(2) + endOfLine;
        return receipt;
    }
};
