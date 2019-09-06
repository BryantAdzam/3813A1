var fs = require("fs");
module.exports = function(app, path) {

    // get all the users
    app.get('/api/users', function(req, res) {
        fs.readFile("users.json", 'utf8', function(err, data) {
            res.end(data);
        });
    });

    // get one user with provided name
    app.get('/api/users/:username', function(req, res) {
        username = req.params.username;
        fs.readFile("users.json", 'utf8', function(err, data) {
            users = JSON.parse(data);
            user = users.filter(function(user) {
                return user.username == username;
            })[0];
            res.json(user);
        });
    });

    //add a user
    app.post('/api/users', function(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        var user = {};
        user.username = req.body.username;
        user.email = req.body.email;
        user.groupList = [];
        user.adminGroupList = [];
        user.ofGroupAdminsRole = false;

        fs.readFile("users.json", 'utf8', function(err, data) {
            data = JSON.parse(data);
            data.push(user);
            var jsonString = JSON.stringify(data);

            fs.writeFile("users.json", jsonString, 'utf8', function(err) {
                res.send(user);
            });
        });
    });

    // change a user details
    app.put('/api/users/:username', function(req, res) {
        username = req.params.username;
        // console.log(username);

        fs.readFile("users.json", 'utf8', function(err, data) {
            users = JSON.parse(data);

            user = users.filter(function(user) {
                return user.username == username;
            })[0];

            index = users.indexOf(user);

            user.email = req.body.email;
            user.groupList = req.body.groupList;
            user.ofGroupAdminsRole = req.body.ofGroupAdminsRole;
            users[index] = user;

            var jsonString = JSON.stringify(users);

            fs.writeFile("users.json", jsonString, 'utf8', function(err) {
                res.json(users[index]);
            });

        });

    });

    // delete a user
    app.delete('/api/users/:username', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        username = req.params.username;

        fs.readFile("users.json", 'utf8', function(err, data) {
            data = JSON.parse(data);
            data = data.filter(function(user) {
                return user.username != username;
            });
            console.log(data);
            var jsonContent = JSON.stringify(data);

            fs.writeFile("users.json", jsonContent, 'utf8', function(err) {
                if (err) throw err;
                console.log('complete');
                console.log("JSON file has been saved.");
                res.status(200).json({
                    isSuccess: true
                });
            });
        });
    });
}