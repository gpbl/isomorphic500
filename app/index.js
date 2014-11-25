"use strict";

var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var favicon      = require('serve-favicon');
var routes       = require('./routes');
var cachebuster  = require('./routes/cachebuster');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(__dirname + '/public/favicon.ico'));

// static files
var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.get(cachebuster.path, cachebuster.remove, express.static(publicPath), cachebuster.restore);

// use react routes
app.use('/', routes);

module.exports = app;