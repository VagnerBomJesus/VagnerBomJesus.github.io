const DataHelper = require('../data/DataHelper');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

class User {
    constructor() {
        this.dataHelper = new DataHelper('users.json');
    }

    async createUser({ fullName, email, password, accessLevel, profilePic, bio }) {
        const users = this.dataHelper.readData();
        if (users.some(user => user.email === email)) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: uuid.v4(),
            fullName,
            email,
            password: hashedPassword,
            accountCreated: new Date(),
            accessLevel: accessLevel || 'author',
            profilePic,
            bio
        };
        users.push(newUser);
        this.dataHelper.writeData(users);
        return newUser;
    }

    findByEmail(email) {
        const users = this.dataHelper.readData();
        return users.find(user => user.email === email);
    }

    async validatePassword(email, password) {
        const user = this.findByEmail(email);
        if (!user) return false;
        return await bcrypt.compare(password, user.password);
    }

    findAllUsers() {
        return this.dataHelper.readData();
    }
}

module.exports = new User();
