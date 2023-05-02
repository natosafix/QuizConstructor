const express = require('express');
const userRouter = require('./routes/user.routes');

const app = express();
const PORT = 8080;
const HOST = 'localhost';

app.use(express.json());
app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});
