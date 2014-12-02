'use strict';

var debug = require('debug')('app');
var webpack = require('webpack');
var config = require('./webpack.config');
var DevServer = require('webpack-dev-server');

new DevServer(webpack(config), {
	publicPath: config.output.publicPath,
	contentBase: 'http://localhost:3000',
	noInfo: true,
	hot: true,
	headers: {
		"Access-Control-Allow-Origin": "*"
	}
}).listen(3001, 'localhost', function (err, result) {
	if (err) console.log(err);
	else debug('Webpack server listening on port 3001');
});


module.exports =  function (req, res) {
	res.redirect('http://localhost:3001/js' + req.path);
};
