const config = require('../../config.js');

// Express
var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
// Socket.io
var io = require('socket.io')(server);
// Rethinkdb
var r = require('rethinkdb');
// Webpack config
var webpackConfig = require('../../webpack.production.config.js');

var authNamespaceHandler = require('../modules/User/authNamespaceHandler.js');

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

r.connect({
    host: config.database.host,
    port: config.database.port,
    db: config.database.db
}).then(function(connection) {

    authNamespaceHandler(io, connection, r);

    server.listen(config.server.port,
        () => {
            console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
            console.log('Server listening on port: ' + config.server.port);
        }
    );
}).error(function(error) {
    console.log('Error connecting to RethinkDB!');
    console.log(error);
});
