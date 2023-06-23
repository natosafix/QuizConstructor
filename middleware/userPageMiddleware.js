const user2Page = require('../userPage');

function userPageMiddleware(req, res, next) {
    let user = req.user.userId;
    if (!(user in user2Page)) {
        user2Page[user] = 'login';
    }
    req.prevPage = user2Page[user];
    next();
}

module.exports = userPageMiddleware;