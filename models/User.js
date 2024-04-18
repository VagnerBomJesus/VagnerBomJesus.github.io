const fs = require('fs');
const bcrypt = require('bcrypt');

class User {
    constructor(filename = 'database/users.json') {
        this.filename = filename;
        try {
            this.data = JSON.parse(fs.readFileSync(filename));
        } catch (e) {
            this.data = [];
        }
    }

    async save(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        this.data.push({ username, password: hashedPassword });
        fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 2));
    }

    findByUsername(username) {
        return this.data.find(u => u.username === username);
    }

    async validatePassword(username, password) {
        const user = this.findByUsername(username);
        if (!user) return false;
        return await bcrypt.compare(password, user.password);
    }
}

module.exports = new User();
