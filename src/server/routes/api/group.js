var fs = require("fs");

module.exports = function(app) {

    var bodyParser = require('body-parser');

    app.use(bodyParser.json());

    // get all the groups
    app.get('/api/groups', function(req, res) {
        fs.readFile("groups.json", 'utf8', function(err, data) {
            res.end(data);
        });
    });

    // add a group
    app.post('/api/groups', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        fs.readFile("groups.json", 'utf8', function(err, data) {
            data = JSON.parse(data);
            var group = {};
            group.id = Math.max.apply(Math, data.map(function(o) { return o.id; })) + 1;
            group.name = req.body.name;
            data.push(group);

            var jsonString = JSON.stringify(data);
            fs.writeFile("groups.json", jsonString, 'utf8', function(err) {
                res.send(group);
            });
        });
    });

    // delete a group
    app.delete('/api/groups/:id', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        id = req.params.id;

        fs.readFile("groups.json", 'utf8', function(err, data) {
            data = JSON.parse(data);
            data = data.filter(function(group) {
                return group.id != id;
            });

            var jsonString = JSON.stringify(data);
            fs.writeFile("groups.json", jsonString, 'utf8', function(err) {
                res.status(200).json({
                    success: true
                });
            });
        });
    });
}