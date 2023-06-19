const DBController = require('./DBController');
const path = require('path');
const htmlChanger = require('../htmlChanger')

class BaseController {
    async getMainPage(req, res) {
        let user = req.user.userId;
        let htmlPath = path.resolve(__dirname, '../static', 'main.html');
        htmlChanger.changeKeys(htmlPath, {'userId': user}, (changedHtml) => res.send(changedHtml));
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

    async acceptGroupInvite(req, res) {
        let response = await DBController.getRequest('groups/addUser',
            {userId: req.user.userId, groupId: req.params.groupId});
        if (!response.ok) {
             htmlChanger.changeKeys(path.resolve(__dirname, '../static', 'pageRedirector.html'),
                {text: "Вы не можете воспользоваться приглашением", userId: req.user.userId},
                (changedHtml) => res.send(changedHtml));
            return res.status(response.status);
        } else {
            return htmlChanger.changeKeys(path.resolve(__dirname, '../static', 'pageRedirector.html'),
                {text: "Вы были добавлены в группу", userId: req.user.userId},
                (changedHtml) => res.send(changedHtml));
        }
    }
}

module.exports = new BaseController();