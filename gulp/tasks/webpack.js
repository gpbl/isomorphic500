'use strict';

var gulp         = require('gulp');
var gutil        = require('gulp-util');
var webpack      = require('webpack');
var handleErrors = require('../utils/handleErrors');
var config       = require('../webpack.config');

gulp.task('webpack', ['clean'], function (callback) {
	webpack(config, function (err, stats) {
		if (err) { handleErrors(err); return; }
		gutil.log("[webpack]", stats.toString({
			colors: true,
			hash: false,
			timings: false,
			assets: true,
			chunks: false,
			chunkModules: false,
			modules: false,
			children: true
		}));
		callback();
	});
});