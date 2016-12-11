process.chdir(__dirname);
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var environment = process.env.NODE_ENV;
var isDevelopment = environment !== 'production';
var webpackConfig = require(isDevelopment ? './webpack.config' : './webpack.config.production');
var fs = require('fs');
var handlebars = require('handlebars');

var globalConfig = require('./conf.json');
var config = {
    title: globalConfig.title,
    host: isDevelopment ? globalConfig.devhost : globalConfig.prodhost
};

var app = new (require('express'))()
var port = 2000

var compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('/', function(req, res) {
    fs.readFile('./index.template.html', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var template = handlebars.compile(data);
        var result = template(config);
        res.send(result);
    });
})

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Port %s: Open up http://localhost:%s/ in your browser.", port, port)
    }
})
