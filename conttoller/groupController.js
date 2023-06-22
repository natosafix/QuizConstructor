const path = require('path');
const htmlChanger = require('../htmlChanger')
const user2Page = require('../userPage');
const DBController = require("./DBController");

class GroupController {
    getSettings(req, res) {
        let groupId = req.params.id;
        let user = req.user.userId;
        let prevPage = req.prevPage;
        let htmlPath = path.resolve(__dirname, '../static', 'groupSettings.html');
        htmlChanger.changeKeys(htmlPath, {'groupId': groupId, 'userId': user, 'prevPage': prevPage},
            (changedHtml) => res.send(changedHtml));
        user2Page[user] = 'settings';
    }

    async acceptInvite(req, res) {
        let user = req.user.userId;
        user2Page[user] = 'invite'
        let response = await DBController.getRequest('groups/addUser',
            {userId: user, groupId: req.params.groupId});
        if (!response.ok) {
            htmlChanger.changeKeys(path.resolve(__dirname, '../static', 'pageRedirector.html'),
                {text: "Вы не можете воспользоваться приглашением", userId: user},
                (changedHtml) => res.send(changedHtml));
            return res.status(response.status);
        } else {
            return htmlChanger.changeKeys(path.resolve(__dirname, '../static', 'pageRedirector.html'),
                {text: "Вы были добавлены в группу", userId: user},
                (changedHtml) => res.send(changedHtml));
        }
    }
}

module.exports = new GroupController();