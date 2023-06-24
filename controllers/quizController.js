const path = require('path');
const htmlChanger = require('../htmlChanger')
const user2Page = require('../userPage');

class QuizController {
    editQuiz(req, res) {
        let quizId = req.params.id;
        let user = req.user.userId;
        let prevPage = req.prevPage;
        let htmlPath = path.resolve(__dirname, '../static', 'quizConstructor.html');
        htmlChanger.changeKeys(htmlPath, {'quizId': quizId, 'userId': user, 'prevPage': prevPage},
            (changedHtml) => res.send(changedHtml));
        user2Page[user] = 'edit';
    }

    solveQuiz(req, res) {
        let quizId = req.params.id;
        let user = req.user.userId;
        let prevPage = req.prevPage;
        let htmlPath = path.resolve(__dirname, '../static', 'quiz.html');
        htmlChanger.changeKeys(htmlPath, {'quizId': quizId, 'userId': user, 'prevPage': prevPage},
            (changedHtml) => res.send(changedHtml));
        user2Page[user] = 'solve';
    }

    checkQuiz(req, res) {
        let quizId = req.params.id;
        let user = req.user.userId;
        let prevPage = req.prevPage;
        let htmlPath = path.resolve(__dirname, '../static', 'checked.html');
        htmlChanger.changeKeys(htmlPath, {'quizId': quizId, 'userId': user, 'prevPage': prevPage},
            (changedHtml) => res.send(changedHtml));
        user2Page[user] = 'check';
    }

}

module.exports = new QuizController();