var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../../webpack.dev.config.js');

new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    https: true,
    hot: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
        '*': 'https://localhost:8181'
    },
}).listen(9001, 'localhost', function(err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
    console.log('Listening at https://localhost:9001/');
});
