const Router = require('express');
const router = new Router();
const groupController = require('../conttoller/groupController');

router.get('/invite/:groupId', groupController.acceptInvite)
router.get('/settings/:id', groupController.getSettings)

module.exports = router;