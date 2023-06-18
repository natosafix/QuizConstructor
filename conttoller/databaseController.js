const DBController = require('./DBController');
const path = require('path');
const htmlChanger = require('../htmlChanger')

class DatabaseController {
    async sendGetRequest(req, res) {
        let user = req.user.userId;
        let response = await DBController.getRequest(req.query.method, req.query.data);
        if (!response.ok)
            return await res.status(response.status);
        return res.json(await response.json());
    }
    async sendPostRequest(req, res) {
        let user = req.user.userId;
        let response = await DBController.postRequest(req.body.method, req.body.data);
        if (!response.ok)
            return res.status(response.status);
        return res.json(await response.json());
    }
}

module.exports = new DatabaseController();