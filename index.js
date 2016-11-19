process.chdir(__dirname);
var deployd = require('deployd');
var port = process.env.PORT || 5000;

var server = deployd({
    port: port,
    env: 'production',
    db: {
        host: 'localhost',
        port: 27017,
        name: 'smokestack-cms',
        // credentials: {
        //     username: 'username',
        //     password: 'password'
        // }
    }
});

server.listen();

server.on('listening', function() {
    console.log("Server is listening on " + port);
});

server.on('error', function(err) {
    console.error(err);
    process.nextTick(function() { // Give the server a chance to return an error
        process.exit();
    });
});
