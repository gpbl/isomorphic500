'use strict';

var debug            = require('debug')('app');
var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig    = require('./webpack.config.dev');
var livereload       = require('livereload');
var fs               = require('fs');
var sass             = require('node-sass');

// Run the webpack dev server
var webpackServer = new WebpackDevServer(webpack(webpackConfig), {
	publicPath: webpackConfig.output.publicPath,
	contentBase: 'http://localhost:3000',
	noInfo: true,
	hot: true,
	headers: {
		"Access-Control-Allow-Origin": "*"
	}
}).listen(3001, 'localhost', function (err, result) {
	if (err) console.log(err);
	else 	debug('Webpack server listening on port 3001');
});

// Render scss files
var renderSass = function(filename) {
	sass.renderFile({
		file: __dirname + '/style/main.scss',
		outFile: __dirname + '/public/css/main.css',
		sourceMap: true,
		success: function (css) { if (filename) debug('Changed '+ filename); },
		error: function (error) { console.log(error); }
	});
};

// Watch for scss changes
fs.watch(__dirname + '/style', function (event, filename) {
	var ext = filename.split('/').pop().split('.').pop();
	if (ext !== 'scss') return;
	renderSass(filename);
});

// Render for the first run
renderSass();

// Watch public dir with livereload
var lr = livereload.createServer();
lr.watch(__dirname + '/public');