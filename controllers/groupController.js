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
        let groupId = req.params.groupId;
        user2Page[user] = 'invite';
        htmlChanger.changeKeys(path.resolve(__dirname, '../static', 'pageRedirector.html'),
            {userId: user, groupId: groupId},
            (changedHtml) => res.send(changedHtml));
    }
}

module.exports = new GroupController();