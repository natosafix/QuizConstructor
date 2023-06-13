const Router = require('express');
const router = new Router();
const formController = require('../conttoller/formController');
const {body} = require('express-validator');

router.get('/:id', formController.openForm);

module.exports = router;