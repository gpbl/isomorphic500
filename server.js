"use strict";

// Enable JSX requires
require('node-jsx').install();

var debug = require('debug')('app');
var app = require('./app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
	debug('Express server listening on port ' + server.address().port);
});

if (app.get('env') === 'development') {
	var webpack = require('webpack');
	var WebpackDevServer = require('webpack-dev-server');
	var config = require('./config/webpack.dev');

	var webpackServer = new WebpackDevServer(webpack(config), {
		publicPath: config.output.publicPath,
		contentBase: 'http://localhost:3000',
		hot: true
	}).listen(3001, 'localhost', function (err, result) {
		if (err) {
			console.log(err);
		} else {
			debug('Webpack server listening on port 3001');
		}
	});
}