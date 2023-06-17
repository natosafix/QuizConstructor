const Router = require('express');
const router = new Router();
const formController = require('../conttoller/formController');

router.get('/edit/:id', formController.editForm);
router.get('/solve/:id', formController.solveForm);
router.get('/mainPage', formController.getMainQuizzes);

module.exports = router;