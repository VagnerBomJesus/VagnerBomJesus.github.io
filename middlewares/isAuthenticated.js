function isAuthenticated(req, res, next) {
    // Aqui você pode integrar uma verificação real de autenticação
    // Para simplificar, vamos assumir que 'user' é passado via headers
    if (req.headers.user === "autorizado") {
        next();
    } else {
        res.status(401).send('Não autorizado');
    }
}

module.exports = isAuthenticated;
