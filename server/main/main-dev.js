var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../../webpack.dev.config.js');
var config = require('../../config.js');

new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
        '*': 'http://localhost:' + config.server.port
    },
}).listen(9001, 'localhost', function(err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
    console.log('Listening at http://localhost:9001/');
});
