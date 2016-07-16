const expect = require('chai').expect;
const Product = require('../src/Product.js');

describe('Product', function() {
    describe('extract the data', function() {

        checkProduct('1 book at 12.49', {
            quantity: 1,
            name: 'book',
            price: 12.49,
            itemText: 'book',
            imported: false,
            exempt: true,
            taxes: 0.00,
            totalPrice: 12.49
        });
        checkProduct('2 music CD at 12.49', {
            quantity: 2,
            name: 'music CD',
            price: 12.49,
            itemText: 'music CD',
            imported: false,
            exempt: false,
            taxes: 2.50,
            totalPrice: 27.48

        });
        checkProduct('3 box of chocolates at 10.00', {
            quantity: 3,
            name: 'chocolates',
            price: 10.00,
            itemText: 'box of chocolates',
            imported: false,
            exempt: true,
            taxes: 0.00,
            totalPrice: 30.00

        });
        checkProduct('1 box of imported chocolates at 11.25', {
            quantity: 1,
            name: 'chocolates',
            price: 11.25,
            itemText: 'box of imported chocolates',
            imported: true,
            exempt: true,
            taxes: 0.60,
            totalPrice: 11.85

        });
        checkProduct('11 imported kittens at 45.54', {
            quantity: 11,
            name: 'kittens',
            price: 45.54,
            itemText: 'imported kittens',
            imported: true,
            exempt: false,
            taxes: 75.90,
            totalPrice:551.54

        });
    });

    describe('check if a product is exempt from taxes', function() {
        it('return true if the product is exempt', function() {
            const product = new Product('1 box of imported chocolates at 11.25');
            expect(product.isExempt('imported chocolates')).to.be.true;
        });
        it('return false if the product is not exempt from taxes', function() {
            const product = new Product('1 music CD at 10.25');
            expect(product.isExempt('music CD')).to.be.false;
        });
    });
});

function checkProduct(line, result) {
    it('from the line ' + line, function() {
        const product = new Product(line);
        product.calculateTotalPrice();
        // product.taxes=product.taxes.toFixed(2);
        expect(product.quantity).to.be.equal(result.quantity);
        expect(product.name).to.be.equal(result.name);
        expect(product.price).to.be.equal(result.price);
        expect(product.itemText).to.be.equal(result.itemText);
        expect(product.imported).to.be.equal(result.imported);
        expect(product.taxes).to.be.equal(result.taxes);
    });
}
