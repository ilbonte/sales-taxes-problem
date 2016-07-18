const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const outputFolder = 'output';
module.exports = class Printer {
    constructor(filePath) {
        this.fileName = path.basename(filePath);
        this.path = path.dirname(filePath);
    }

    toFile() {
        path.join(this.path, outputFolder);
        mkdirp(path.join(this.path, outputFolder), (err) => {
            if (err) throw err;
            fs.writeFile(path.join(this.path, outputFolder, this.fileName), this.text, (err) => {
                if (err) throw err;
            });

        });
    }

    toScreen() {
        console.log('\n');
        console.log(this.fileName);
        console.log(this.text);
        console.log('\n');
    }

    setText(text) {
        this.text = text;
    }
};
