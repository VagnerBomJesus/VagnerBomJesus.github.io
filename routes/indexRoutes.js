const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

// Rota pública
router.get('/', (req, res) => {
    res.send('Página Inicial');
});

// Rota protegida
router.get('/secret', isAuthenticated, (req, res) => {
    res.send('Área secreta');
});

module.exports = router;
