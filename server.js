'use strict';

// enables JSX requires
require('node-jsx').install({ extension: '.jsx' });

var debug        = require('debug')('app');
var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var routes       = require('./routes');
var cachebuster  = require('./routes/cachebuster');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// static files with cache buster
var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.get(cachebuster.path, cachebuster.remove, express.static(publicPath), cachebuster.restore);

if (app.get('env') === 'development') {
	// run livereload and webpack dev server
	require('./dev-tools');
	// use webpack dev server for serving js files
	app.use('/js', function (req, res) {
		res.redirect('http://localhost:3001/js' + req.path);
	});
}

// use react routes
app.use('/', routes);

// error pages
app.use(function (err, req, res, next) {
	res.status(500);
	if (app.get('env') === 'development') {
		res.send('<pre>' + err.stack + '</pre>');
	}
	else {
		res.render("error"); 
	}
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
	debug('Express ' + app.get('env') + ' server listening on port ' + server.address().port);
});

module.exports = server;