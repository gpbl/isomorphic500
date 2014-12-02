'use strict';

// enables JSX requires
require('node-jsx').install({ extension: '.jsx', harmony: true });

var debug        = require('debug')('app');
var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var routes       = require('./app/routes/server.jsx');

var server = express();

server.use(logger(server.get('env') === 'production' ? 'combined' : 'dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

// static files with cache buster
var publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

if (server.get('env') === 'production') {
  // TODO: create a npm module for that
  var cachebuster  = require('./routes/cachebuster');
  server.get(cachebuster.path, cachebuster.remove, express.static(publicPath), cachebuster.restore);
}

if (server.get('env') === 'development') {
  // add some dev tools
  server.use('/js', require('./dev/webpack'));
  require('./dev/less');
  require('./dev/livereload');
}

// use react routes
server.use('/', routes);

// error pages
server.use(function (err, req, res, next) {
  res.status(500);
  // TODO: simple page for errors not in dev environment
  res.send('<pre>' + err.stack + '</pre>');
});

server.set('port', process.env.PORT || 3000);
server.listen(server.get('port'), function () {
  debug('Express ' + server.get('env') + ' server listening on port ' + this.address().port);
});
