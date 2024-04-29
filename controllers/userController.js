
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
        const user = await User.findByEmail(email);  // Corrigido para usar o método correto
        const valid = user && await User.validatePassword(email, password);

        if (valid) {
            req.session.user = user;  // Armazena informações do usuário na sessão
            res.redirect('/profile');  // Redireciona para a página do perfil do usuário
        } else {
            console.log('Invalid credentials');
            res.status(401).render('login', { error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send(error.message);
    }
};





