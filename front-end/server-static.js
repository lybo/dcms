var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    fs.readFile(path.join(__dirname, 'public/index.html'), 'utf8', function (err, data) {
        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(500).send(err);
        }
    });
});

var server = app.listen(3101, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://localhost:%s', port);
});
