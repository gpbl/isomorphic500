'use strict';

// enables JSX requires
require('node-jsx').install({ extension: '.jsx' });

var debug        = require('debug')('app');
var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var cachebuster  = require('./cachebuster');
var serverRender = require('./server.jsx');

var app = express();

app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// static files with cache buster
var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
if (app.get('env') === 'production') {
  app.get(cachebuster.path, cachebuster.remove, express.static(publicPath), cachebuster.restore);
}

if (app.get('env') === 'development') {
  // run livereload and webpack dev server
  require('./dev-tools');
  // use webpack dev server for serving js files
  app.use('/static', function (req, res) {
    res.redirect('http://localhost:3001/static' + req.path);
  });
}

// use react routes
app.use('/', serverRender);

// error pages
app.use(function (err, req, res, next) {
  res.status(500);
  // TODO: simple page for errors not in dev environment
  res.send('<pre>' + err.stack + '</pre>');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  debug('Express ' + app.get('env') + ' server listening on port ' + this.address().port);
});
