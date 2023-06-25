const DBController = require('./DBController');
const path = require('path');
const htmlChanger = require('../htmlChanger')

class DatabaseController {
    async sendGetRequest(req, res) {
        let response = await DBController.getRequest(req.query.method, JSON.parse(req.query.data));
        if (!response.ok)
            return await res.status(response.status);
        try {
            return res.json(await response.json());
        } catch (e) {
            console.error(e);
            return res.status(400);
        }
    }
    async sendPostRequest(req, res) {
        let response = await DBController.postRequest(req.body.method, req.body.data);
        if (!response.ok)
            return res.status(response.status);
        try {
            return res.json(await response.json());
        } catch (e) {
            console.error(e);
            return res.status(400);
        }
    }

    async sendPutRequest(req, res) {
        let response = await DBController.putRequest(req.body.method, req.body.data);
        if (!response.ok)
            return res.status(response.status);
        try {
            return res.json(await response.json());
        } catch (e) {
            console.error(e);
            return res.status(400);
        }
    }

    async sendDeleteRequest(req, res) {
        let response = await DBController.deleteRequest(req.body.method, req.body.data);
        if (!response.ok)
            return res.status(response.status);
        try {
            return res.json(await response.json());
        } catch (e) {
            console.error(e);
            return res.status(400);
        }
    }
}

module.exports = new DatabaseController();