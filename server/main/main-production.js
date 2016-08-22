// Express
var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
// Webpack config
var webpackConfig = require('../../webpack.production.config.js');

app.use(
    webpackConfig.output.publicPath,
    express.static(path.join(
            __dirname,
            '../..',
            'dist' // directory name given in webpackConfig.output.path
        ))
);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/main/main.html'));
});

app.listen(9000);
console.log('Listening on port 9000');
