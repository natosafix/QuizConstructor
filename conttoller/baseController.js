const DBController = require('./DBController');
const path = require('path');
const htmlChanger = require('../htmlChanger')
const user2Page = require('../userPage');

class BaseController {
    async getMainPage(req, res) {
        let user = req.user.userId;
        let prevPage = req.prevPage;
        let htmlPath = path.resolve(__dirname, '../static', 'main.html');
        htmlChanger.changeKeys(htmlPath, {'userId': user, 'prevPage': prevPage},
            (changedHtml) => res.send(changedHtml));
        user2Page[user] = 'main';
    }

    async getMainQuizzes(req, res) {
        try {
            const data = await DBController.getQuizzes(req.user.userId);
            console.log(data);
            res.json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
}

module.exports = new BaseController();