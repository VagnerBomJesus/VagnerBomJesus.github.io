
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const user = await User.createUser(req.body);
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const valid = await User.validatePassword(email, password);
        if (valid) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
