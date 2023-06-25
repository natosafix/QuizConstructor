const Router = require('express');
const router = new Router();
const databaseController = require('../controllers/databaseController');

router.get('/apiRequest', databaseController.sendGetRequest);
router.post('/apiRequest', databaseController.sendPostRequest);
router.put('/apiRequest', databaseController.sendPutRequest);
router.delete('/apiRequest', databaseController.sendDeleteRequest);

module.exports = router;