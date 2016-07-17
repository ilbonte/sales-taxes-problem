const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
module.exports = class Printer {
    constructor(filePath) {
        this.fileName = path.basename(filePath);
        this.path = path.dirname(filePath);
    }
    
    toFile() {
        mkdirp(this.path + '/out', (err) => {
            if (err) throw err;
            fs.writeFile(this.path + '/out/' + this.fileName, this.text, (err) => {
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
