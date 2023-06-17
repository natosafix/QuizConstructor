const Router = require('express');
const router = new Router();
const formController = require('../conttoller/formController');
const {body} = require('express-validator');

router.get('/edit/:id', formController.editForm);
router.get('/solve/:id', formController.solveForm);
router.post('/mainPage', formController.getMainQuizzes);

module.exports = router;