var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'public/static/'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            '__DEV_TOOLS__': true,
            '__DEV_HOST__': true,
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.less$/,
                loader: 'style!css!autoprefixer!less'
            }
        ],
        rules: [
            {
                test: /\.ya?ml$/,
                use: {
                    loader: 'yaml-import-loader',
                    options: {

                        // Allows !import <file> without key. When using this the
                        // targets file content will be inserted at the import location.
                        importRoot: false,

                        // Allows !import <file> with key. Set this and importRoot to
                        // false for a regular yaml-loader.
                        importNested: true,

                        // The import keyword: `!${importKeyword} <file>` for yaml/json
                        // contents
                        importKeyword: 'import',

                        // The import-raw keyword: `!${importRawKeyword} <file>` for raw
                        // file contents
                        importRawKeyword: 'import-raw',

                        // Output type. Can be 'object', 'json', or 'yaml'
                        // 'object' -> exported js object
                        // 'json'   -> stringified json
                        // 'yaml'   -> stringified yaml
                        output: 'object',

                        // The options below are passed to js-yaml.
                        parser: {

                            // Allows adding custom types, details below.
                            types: [],

                            // Base schema to extend, can be an array of schemas.
                            schema: require('js-yaml').SAFE_SCHEMA,

                            // Allows a duplicate key. The old value in a duplicate key
                            // will be overwritten (json option in js-yaml).
                            allowDuplicate: true,

                            // function to call on warning messages. Parser will throw on
                            // warnings if this function is not provided.
                            onWarning: undefined
                        }
                    }
                }
            }
        ]
    }
}
