const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config")
const apiController = require('./apiController');
const path = require('path');

const generateAccessToken = (username) => {
    const payload = {
        userId: username
    }
    return jwt.sign(payload, secret, {expiresIn: "30d"} )
}

class AuthController {
    registration(req, res) {
        return res.sendFile(path.resolve(__dirname, '../static/registration.html'));
    }

    async checkRegistration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            const {username, password} = req.body;
            const candidate = await apiController.getUser(username);
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"});
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при авторизации", errors});
            }
            const {username, password} = req.body
            const user = await apiController.getUser(username)
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user.username)
            res.cookie('auth', `${token}`, { maxAge: 2592000000, httpOnly: true, secure: true })
            return res.redirect('/')
        } catch (e) {
            console.error(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new AuthController();