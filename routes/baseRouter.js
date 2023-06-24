const Router = require('express');
const router = new Router();
const baseController = require('../controllers/baseController');

router.get('/', baseController.getMainPage);
router.get('/mainPage', baseController.getMainQuizzes);

module.exports = router;