const Router = require('express');
const router = new Router();
const databaseController = require('../controllers/databaseController');

router.get('/apiRequest', databaseController.sendGetRequest);
router.post('/apiRequest', databaseController.sendPostRequest);

module.exports = router;