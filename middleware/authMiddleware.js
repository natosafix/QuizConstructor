const jwt = require('jsonwebtoken');
const {secret} = require('../config');
const api = require('../conttoller/apiController');

function authMiddleware(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.cookies.auth;
        req.user = jwt.verify(token, secret);
        next();
    } catch (e) {
        //console.error(e);
        return res.redirect('/login');
    }
}

module.exports = authMiddleware;
