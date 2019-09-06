var fs = require("fs");


module.exports = function(app) {
    var bodyParse = require('body-parser');
    app.use(bodyParse.json());

    app.get('/api/login/:username', function(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        username = req.params.username;
        console.log(username);
        fs.readFile("users.json", 'utf8', function(err, data) {
            users = JSON.parse(data);
            user = users.filter(
                // item => item.username == username
                function(user) {
                    return user.username == username;
                }
            )[0];
            res.json(user);
        });
    });
}