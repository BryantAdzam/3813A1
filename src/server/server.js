var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

var api = require('./routes/api/login')(app);
var group = require('./routes/api/group')(app);
var channel = require('./routes/api/channel')(app);
var user = require('./routes/api/user')(app);

app.listen(3000, () => {
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server has been started at : ' + n + ':' + m);
});