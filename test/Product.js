const expect = require('chai').expect;
const Product = require('../src/Product.js');

describe('Product', function() {
    describe('extract the data from a line', function() {

        checkProduct('1 book at 12.49', {
            quantity: 1,
            name: 'book',
            price: 12.49,
            itemText: 'book',
            imported: false,
            exempt:true
        });
        checkProduct('1 music CD at 12.49', {
            quantity: 1,
            name: 'music CD',
            price: 12.49,
            itemText: 'music CD',
            imported: false,
            exempt:false

        });
        checkProduct('1 imported box of chocolates at 10.00', {
            quantity: 1,
            name: 'chocolates',
            price: 10.00,
            itemText: 'imported box of chocolates',
            imported: true,
            exempt:true

        });
        checkProduct('1 box of imported chocolates at 11.25', {
            quantity: 1,
            name: 'imported chocolates',
            price: 11.25,
            itemText: 'box of imported chocolates',
            imported: true,
            exempt:true
            
        });
    });

    describe('check if a product is exempt from taxes', function(){
      it('return true if the product is exempt', function(){
        const product = new Product('1 box of imported chocolates at 11.25');
        expect(product.isExempt('imported chocolates')).to.be.true;
      });
      it('return false if the product is not exempt from taxes', function(){
        const product = new Product('1 music CD at 10.25');
        expect(product.isExempt('music CD')).to.be.false;
      });
    });
});

function checkProduct(line, result) {
    it('extract data from ' + line, function() {
        const product = new Product(line);
        expect(product.quantity).to.be.equal(result.quantity);
        expect(product.name).to.be.equal(result.name);
        expect(product.price).to.be.equal(result.price);
        expect(product.itemText).to.be.equal(result.itemText);
        expect(product.imported).to.be.equal(result.imported);
    });
}
