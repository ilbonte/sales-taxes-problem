var expect = require("chai").expect;
var utils = require("../src/utils.js");

describe("Utils function", function() {
    describe("Test text for syntax errors", function() {
        it("returns true if there aren't syntax errors", function() {
            const input1 = `1 book at 12.49
          1 music CD at 14.99
          1 chocolate bar at 0.85`;
            const input2 = `1 imported box of chocolates at 10.00
          1 imported bottle of perfume at 47.50`;
            const input3 = `1 imported bottle of perfume at 27.99
          1 bottle of perfume at 18.99
          1 packet of headache pills at 9.75
          1 box of imported chocolates at 11.25`;

            expect(utils.checkSyntax(utils.textToArray(input1)).isValid).to.be.true;
            expect(utils.checkSyntax(utils.textToArray(input2)).isValid).to.be.true;
            expect(utils.checkSyntax(utils.textToArray(input3)).isValid).to.be.true;
        });
        //---------------------------------------------------------------
        //_______________________________________________________________
        //---------------------------------------------------------------
        it("returns false if product name is missing", function() {
            const error1 = `1 at 12.49`;
            expect(utils.checkSyntax(utils.textToArray(error1)).isValid).to.be.false;
        });
        it("returns false if quantity is missing", function() {
            const error2 = `imported bottle of perfume at 47.50`;
            expect(utils.checkSyntax(utils.textToArray(error2)).isValid).to.be.false;
        });
        it("returns false if the price don't have 2 decimals", function() {
            const error3 = `1 imported bottle of perfume at 27.9`;
            expect(utils.checkSyntax(utils.textToArray(error3)).isValid).to.be.false;
        });
        it("returns false when there isn't the price", function() {
            const error4 = `1 imported bottle of perfume at `;
            expect(utils.checkSyntax(utils.textToArray(error4)).isValid).to.be.false;
        });
    });

    describe('calculate the tax to be paied rounded up to the nearest 0.05', function() {
        checkTaxCalculation(0, 10, 0);
        checkTaxCalculation(12.13, 10, 1.25);
        checkTaxCalculation(12.13, 5, 0.65);
    });
});

function checkTaxCalculation(price, rate, result) {
    it('return the taxes to paied for an item with price: ' + price + ' and tax rate: ' + rate, function() {
        expect(utils.calculateTaxes(price, rate)).to.be.equal(result);
    });
}
