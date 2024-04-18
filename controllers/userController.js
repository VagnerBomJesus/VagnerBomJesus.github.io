const User = require('../models/User.js');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (User.findByUsername(username)) {
        return res.status(409).send('Usuário já existe!');
    }
    await User.save(username, password);
    res.send('Usuário registrado com sucesso!');
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const valid = await User.validatePassword(username, password);
    if (!valid) {
        return res.status(401).send('Usuário ou senha inválidos!');
    }
    res.send('Login bem sucedido!');
};
