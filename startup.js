const express = require('express');
const authRouter = require('./routes/authRouter');
const quizRouter = require('./routes/quizRouter')
const baseRouter = require('./routes/baseRouter');
const databaseRouter = require('./routes/databaseRouter');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer();
const htmlChanger = require('./htmlChanger');

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

app.use(baseRouter)
app.use('/quiz', quizRouter);
app.use('/db', databaseRouter);

app.listen(PORT, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});
