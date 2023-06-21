const Router = require('express');
const router = new Router();
const formController = require('../conttoller/quizController');

router.get('/edit/:id', formController.editQuiz);
router.get('/solve/:id', formController.solveQuiz);
router.get('/check/:id', formController.checkQuiz)

module.exports = router;