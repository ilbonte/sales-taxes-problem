const program = require('commander');
const fs = require('fs');
const utils = require('./utils.js');
const Printer = require('./Printer.js');
const Cart = require('./Cart.js');
program
    .option('-p, --path [path]', 'Print receipt to screen')
    .option('-d, --display', 'Print receipt to screen')
    .parse(process.argv);
if (pathIsPresent()) {
    fs.stat(program.path, (err, stat) => {
        if (err === null) {
            if (stat.isFile()) {
                getTextFromFile(program.path, start);
            } else if (stat.isDirectory()) {
                readFilesInDirectory();
            }
        } else if (err.code == 'ENOENT') {
            // file does not exist
            console.error('ENOENT: no such file or directory ' + err.path);
        } else {
            console.error('Error opening the path: ' + err.code);
        }
    });
} else {
    console.error('Path to file or directory is required');
}


function getTextFromFile(filePath, callback) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;
        callback(filePath, data);
    });
}


function start(filePath, text) {
    const print = new Printer(filePath);
    const lines = utils.textToArray(text);
    const textSyntax = utils.checkSyntax(lines);
    if (textSyntax.isValid) {
      const cart = new Cart(lines);
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

function readFilesInDirectory(){
  fs.readdir(program.path, (err, files) => {
      if (err) throw err;
      files.forEach((itemName) => {
          const itemPath = program.path + '\\' + itemName;
          //ignore directories
          if (fs.statSync(itemPath).isFile()) {
              getTextFromFile(itemPath, start);
          }
      });
  });
}

function pathIsPresent(){
  return typeof program.path === 'string';
}
