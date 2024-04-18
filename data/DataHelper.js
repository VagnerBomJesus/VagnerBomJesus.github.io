const fs = require('fs');
const path = require('path');

class DataHelper {
    constructor(filename) {
        this.filename = path.join(__dirname, '../data', filename);
    }

    readData() {
        try {
            const data = fs.readFileSync(this.filename, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Read error:', err);
            return [];
        }
    }

    writeData(data) {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(data, null, 2), 'utf8');
        } catch (err) {
            console.error('Write error:', err);
        }
    }
}

module.exports = DataHelper;
