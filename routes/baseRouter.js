const Router = require('express');
const router = new Router();
const baseController = require('../conttoller/baseController');

router.get('/', baseController.getMainPage);
router.get('/mainPage', baseController.getMainQuizzes);

module.exports = router;