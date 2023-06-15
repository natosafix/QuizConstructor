const apiController = require('./apiController');
const path = require('path');
const htmlChanger = require('../htmlChanger')

class FormController {
    editForm(req, res) {
        let quizId = req.params.id;
        let user = req.user.userId;
        let htmlPath = path.resolve(__dirname, '../static', 'quizConstructor.html');
        htmlChanger.changeKeys(htmlPath, {'quizId': quizId, 'userId': user},
            (changedHtml) => res.send(changedHtml));
    }

    solveForm(req, res) {
        let quizId = req.params.id;
        let user = req.user;
        let htmlPath = path.resolve(__dirname, '../static', 'quizConstructor.html');
        htmlChanger.changeKeys(htmlPath, {'quizId': quizId, 'userId': user},
            (changedHtml) => res.send(changedHtml));
    }
}

module.exports = new FormController();