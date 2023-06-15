const Router = require('express');
const router = new Router();
const authController = require('../conttoller/authController');
const {body} = require('express-validator');
const pattern = /^[A-Za-z0-9!@#\$%\^&\*\(\)]+$/

router.get('/login', authController.login);
router.get('/registration', authController.registration);
router.post('/login/check',
    body('username').isLength({min: 2, max: 15}).matches(pattern),
    body('password').isLength({min: 2}).matches(pattern),
    authController.checkLogin);
router.post('/registration/check',
    body('username').isLength({min: 2, max: 15}).matches(pattern),
    body('password').isLength({min: 2}).matches(pattern),
    authController.checkRegistration);

module.exports = router;