const Router = require('express');
const router = new Router();
const authController = require('../conttoller/authController');
const {body} = require('express-validator');

router.get('/login', authController.login);
router.get('/registration', authController.registration);
router.post('/login/check',
    body('username').isLength({min: 2, max: 10}).matches(/^[A-Za-z0-9!@#\$%\^&\*\(\)]+$/),
    body('password').isLength({min: 2, max: 10}).matches(/^[A-Za-z0-9!@#\$%\^&\*\(\)]+$/),
    authController.checkLogin);
router.post('/registration/check',
    body('username').isLength({min: 2, max: 10}).matches(/^[A-Za-z0-9!@#\$%\^&\*\(\)]+$/),
    body('password').isLength({min: 2, max: 10}).matches(/^[A-Za-z0-9!@#\$%\^&\*\(\)]+$/),
    authController.checkRegistration);

module.exports = router;