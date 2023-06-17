const fs = require("fs");

class HtmlChanger {
    changeKeys(path, keys2Values, handleChangedHtml) {
        let changedHtml;
        fs.readFile(path, 'utf-8', function (error, html) {
            if (error) {
                throw error;
            }
            for (let key in keys2Values) {
                html = html.replaceAll(`{ ${key} }`, keys2Values[key]);
            }
            changedHtml = html;
            handleChangedHtml(changedHtml);
        });
    }
}

module.exports = new HtmlChanger();