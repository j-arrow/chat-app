var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../../webpack.dev.config.js');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
        '*': 'http://localhost:9000'
    },
}).listen(9001, 'localhost', function(err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:9001/');
});
