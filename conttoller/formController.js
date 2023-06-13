const apiController = require('./apiController');
const path = require('path');

class FormController {
    openForm(req, res) {
        let formData = apiController.getForm(req.params.id);
    }
}

module.exports = new FormController();