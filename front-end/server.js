process.chdir(__dirname);
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var environment = process.env.NODE_ENV;
var config = require(environment !== 'production' ? './webpack.config' : './webpack.config.production');

var app = new (require('express'))()
var port = 2000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Port %s: Open up http://localhost:%s/ in your browser.", port, port)
    }
})
