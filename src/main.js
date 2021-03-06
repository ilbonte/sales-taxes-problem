// https://github.com/xpeppers/sales-taxes-problem
const program = require('commander');
const fs = require('fs');
const path = require('path');
const utils = require('./utils.js');
const Printer = require('./Printer.js');
const Cart = require('./Cart.js');


exports.startApplication = function() {
    program
        .option('-p, --path [path]', 'Calculate the price from the given file(s) and print receipt to file')
        .option('-d, --display', 'Print receipt to screen')
        .parse(process.argv);
    if (pathIsPresent()) {
        fs.stat(program.path, (err, item) => {
            if (err === null) {
                if (item.isFile()) {
                    getTextFromFile(program.path, readProductList);
                } else if (item.isDirectory()) {
                    readFilesInDirectory();
                }
            } else if (err.code == 'ENOENT') {
                // file does not exist
                console.error('No such file or directory ' + err.path);
            } else {
                console.error('Error opening the path: ' + err.code);
            }
        });
    } else {
        console.error('Path to file or directory is required');
    }
};



function getTextFromFile(filePath, callback) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;
        callback(filePath, data);
    });
}


function readFilesInDirectory() {
    fs.readdir(program.path, (err, files) => {
        if (err) throw err;
        files.forEach((itemName) => {
            const itemPath = path.join(program.path, itemName);
            if (isItemFile(itemPath)) {
                getTextFromFile(itemPath, readProductList);
            }
        });
    });
}

function readProductList(filePath, text) {
    const print = new Printer(filePath);
    const textLines = utils.textToArray(text);
    const textSyntax = utils.checkSyntax(textLines);
    if (textSyntax.isValid) {
        const cart = new Cart(textLines);
        cart.calculateTotal();

        print.setText(cart.getReceipt());
        if (program.display) {
            print.toScreen();
        }
        print.toFile();
    } else {
        console.error('Error in ' + print.fileName + ' at line ' + textSyntax.wrongLines.join(', '));
    }

}

function pathIsPresent() {
    return typeof program.path === 'string';
}

function isItemFile(itemPath) {
    return fs.statSync(itemPath).isFile();
}
