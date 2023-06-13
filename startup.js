const express = require('express');
const authRouter = require('./routes/authRouter');
const formRouter = require('./routes/formRouter');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer();

const app = express();
const PORT = 8080;
const HOST = 'localhost';

app.use(upload.array());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(authRouter)

app.use(authMiddleware);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'main.html'));
});
/*app.get('/reg', (req, res) => {
    res.cookie('auth', 'some_token', { maxAge: 60000, httpOnly: true, secure: true });
    res.sendFile(path.resolve(__dirname, 'static', 'login.html'));
});*/

app.use('/form', formRouter);

app.listen(PORT, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});