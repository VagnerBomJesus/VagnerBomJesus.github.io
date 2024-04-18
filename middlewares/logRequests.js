function logRequests(req, res, next) {
    console.log(`${new Date().toISOString()} - ${req.method} Request to ${req.url}`);
    next();
}

module.exports = logRequests;
