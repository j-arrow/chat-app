var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-eval-cheap-source-map',
  entry: [
      'webpack-dev-server/client?http://localhost:9001', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      path.join(__dirname, './client/main/main'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
      loaders: [{
          test: /.js?$/,
          loaders: [
              'react-hot',
              'babel-loader'
          ],
          exclude: /node_modules/,
          include: [
              path.join(__dirname, '/client/'),
              path.join(__dirname, '/shared/')
          ]
      }]
  },
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
