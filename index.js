const express = require('express');
const app = express();

const PORT = 8080;
const HOST = 'localhost';
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});
