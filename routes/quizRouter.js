const Router = require('express');
const router = new Router();
const quizController = require('../conttoller/quizController');

router.get('/edit/:id', quizController.editQuiz);
router.get('/solve/:id', quizController.solveQuiz);
router.get('/check/:id', quizController.checkQuiz)
router.get('/groupSettings/:id', quizController.groupSettings)

module.exports = router;