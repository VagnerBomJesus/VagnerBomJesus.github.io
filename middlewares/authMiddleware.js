const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assume 'Bearer [token]'
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Authentication failed' });
    }
}

module.exports = auth;
