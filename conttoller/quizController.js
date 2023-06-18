const apiController = require('./DBController');
const path = require('path');
const htmlChanger = require('../htmlChanger')

class QuizController {
    editQuiz(req, res) {
        let quizId = req.params.id;
        let user = req.user.userId;
        let htmlPath = path.resolve(__dirname, '../static', 'quizConstructor.html');
        htmlChanger.changeKeys(htmlPath, {'quizId': quizId, 'userId': user},
            (changedHtml) => res.send(changedHtml));
    }

    solveQuiz(req, res) {
        let quizId = req.params.id;
        let user = req.user.userId;
        // TODO адресовать нужно не на проверку, а на решение
        let htmlPath = path.resolve(__dirname, '../static', 'checked.html');
        htmlChanger.changeKeys(htmlPath, {'quizId': quizId, 'userId': user},
            (changedHtml) => res.send(changedHtml));
    }
}

module.exports = new QuizController();