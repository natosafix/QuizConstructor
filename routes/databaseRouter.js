const Router = require('express');
const router = new Router();
const databaseController = require('../conttoller/databaseController');

router.get('/apiRequest', databaseController.sendGetRequest);
router.post('/apiRequest', databaseController.sendPostRequest);

module.exports = router;