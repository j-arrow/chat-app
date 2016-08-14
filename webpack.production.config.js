var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');





// LOAD AND PREPARE .babelrc
var fs = require('fs');
var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};
try {
    babelrcObject = JSON.parse(babelrc);
} catch (err) {
    console.error('==> ERROR: Error parsing your .babelrc.');
    console.error(err);
}
var babelrcObjectDevelopment =
    babelrcObject.env !== undefined &&
    babelrcObject.env.development !== undefined ||
    {};
// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
if (babelrcObjectDevelopment.plugins !== undefined) {
    combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);
}
var babelLoaderQuery = Object.assign(
    {},
    babelrcObjectDevelopment,
    babelrcObject,
    {plugins: combinedPlugins}
);
delete babelLoaderQuery.env;
// Since we use .babelrc for client and server, and we don't want HMR enabled
// on the server, we have to add the babel plugin react-transform-hmr manually
// here.
// Make sure react-transform is enabled.
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
    var plugin = babelLoaderQuery.plugins[i];
    if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
        reactTransform = plugin;
    }
}





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
                loader: 'babel-loader?' + JSON.stringify(babelLoaderQuery),
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
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
