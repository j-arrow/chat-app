var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: [
        path.join(__dirname, './client/main/main')
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/static/'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style', // The backup style loader
                    'css?sourceMap!sass?sourceMap'
                )
            }, {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [
                    path.join(__dirname, '/client/'),
                    path.join(__dirname, '/shared/')
                ]
            }
        ]
    },
    sassLoader: {
        includePaths: [
            'client/ui/modules'
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
    ],
    resolve: {
      alias: {
        $shared: path.resolve('./shared'),
        $client: path.resolve('./client/modules'),
        $server: path.resolve('./server/modules')
      },
      modulesDirectories: [
        'modules',
        'node_modules',
        'web_modules',
      ],
    }
}
