const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config")
const apiController = require('./apiController');
const path = require('path');

const generateAccessToken = (username) => {
    const payload = {
        userId: username
    };
    return jwt.sign(payload, secret, {expiresIn: "30d"} );
}

class AuthController {
    static validateBody(req) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (errors.errors[0].path === "username") {
                return {
                    message: "Недопустимое имя пользователя. Длина от 2 до 15 символов. " +
                        "Допустимые символы: цифры, латинские буквы, !@#$%^&*(\\)",
                    type: "username"
                };
            }
            else {
                return {
                    message: "Недопустимый пароль. Длина от 5 символов. " +
                        "Допустимые символы: цифры, латинские буквы, !@#$%^&*(\\)",
                    type: "password"
                };
            }
        }
        return null;
    }

    registration(req, res) {
        return res.sendFile(path.resolve(__dirname, '../static/registration.html'));
    }

    async checkRegistration(req, res) {
        try {
            let validationInfo = AuthController.validateBody(req);
            if (validationInfo)
                return res.json(validationInfo);
            const {username, password} = req.body;
            const candidate = await apiController.getUser(username);
            if (candidate) {
                return res.json({message: "Пользователь с таким именем уже существует", type: "username"});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = await apiController.createUser({username: username, password: hashPassword});
            return res.redirect('/login');
        } catch (e) {
            console.error(e);
            res.status(400).json({message: 'Registration error'});
        }
    }

    login(req, res) {
        return res.sendFile(path.resolve(__dirname, '../static/login.html'));
    }

    async checkLogin(req, res) {
        try {
            let validationInfo = AuthController.validateBody(req);
            if (validationInfo)
                return res.json(validationInfo);
            const {username, password} = req.body;
            const user = await apiController.getUser(username);
            if (!user) {
                return res.json({message: `Пользователь ${username} не найден`, type: "username"});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.json({message: `Введен неверный пароль`, type: "password"});
            }
            const token = generateAccessToken(user.username);
            res.cookie('auth', `${token}`, { maxAge: 2592000000, httpOnly: true, secure: true });
            return res.redirect('/');
        } catch (e) {
            console.error(e);
            res.status(400).json({message: 'Login error'});
        }
    }
}

module.exports = new AuthController();