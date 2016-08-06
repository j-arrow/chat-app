var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        path.join(__dirname, './client/main/main.js')
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: [
                path.join(__dirname, '/client/'),
                path.join(__dirname, '/shared/')
            ]
        }]
    },
    resolve: {
      modulesDirectories: [
        'modules',
        'node_modules',
        'web_modules',
      ],
    }
}
