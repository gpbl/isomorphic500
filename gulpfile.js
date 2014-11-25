"use strict";

var gulp         = require('gulp'),
    gutil        = require("gulp-util"),
    filter       = require('gulp-filter'),
    replace      = require('gulp-replace'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint       = require('gulp-jshint'),
    react        = require('gulp-react'),
    cachebust    = new require('gulp-cachebust')(),
    fs           = require('fs-extra'),
    minifyCSS    = require('gulp-minify-css'),
    sass     		 = require('gulp-ruby-sass'),
    webpack      = require("webpack"),
    webpackBuild = require('./webpack.build'),
    webpackDev   = require('./webpack.dev');

var paths = {
		build: 		'build/',
		public: 	'app/public/',
		sass: 		'app/style/main.scss',
		server: 	['package.json', 'server.js', 'app/*.js', 'app/routes/**/*', 'app/components/**/*.jsx'],
		views: 		['app/views/**/*.ejs']
};

// Build for production
gulp.task('build', ['clean', 'sass', 'webpack', 'copy', 'bust']);

gulp.task('sass', function () {
  var filterCSS = filter('**/*.css');
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(filterCSS)
    .pipe(autoprefixer())
    .pipe(filterCSS.restore())
    .pipe(gulp.dest(paths.public + 'css'));
});

// Clean build directory
gulp.task('clean', function (callback) {
  fs.remove(paths.build, callback);
});

// create chunks and uglify with webpack
gulp.task('webpack', ['clean'], function (callback) {
  webpack(webpackBuild, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
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

// Copy the app
gulp.task('copy', ['copy:server', 'copy:views', 'copy:public', 'copy:node_modules']);

// copy server files
gulp.task('copy:server', ['clean'], function() {
	return gulp.src(paths.server, { base: '.' })
		.pipe(gulp.dest(paths.build));
});

// copy views after replacing webpack's loaded scripts
gulp.task('copy:views', ['clean'],  function(){
	return gulp.src(paths.views, { base: '.' })
	.pipe(replace(webpackDev.output.publicPath, webpackBuild.output.publicPath))
	.pipe(gulp.dest(paths.build));
});

// copy public
gulp.task('copy:public', ['clean', 'sass'],  function() {
	var src = [paths.public + '**/*', '!**/*.map'];
	var filterCSS = filter('**/*.css');

	return gulp.src(src, { base: '.' })

		.pipe(filterCSS)
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(filterCSS.restore())

		.pipe(gulp.dest(paths.build));
});

// copy npm dependencies
/* jshint ignore: start */
var  Promise      = require('es6-promise').Promise;
/* jshint ignore: end */
gulp.task('copy:node_modules', ['clean'], function (callback) {

  var dest = paths.build + 'node_modules/';
  fs.mkdirsSync(dest);

  var promises = [];
  var promiseFromCopy = function (source, dest) {
    return new Promise(function (resolve, reject) {
      fs.copy(source, dest, function (err) { err ? reject(err) : resolve(true); });
    });
  };

  var packages = require('./package.json').dependencies;
  for (var pkg in packages) promises.push(promiseFromCopy('./node_modules/' + pkg, dest + pkg));

  Promise.all(promises).then(function () {
    gutil.log("[copy:node_modules]", 'Copied ' + Object.keys(packages).length + ' module(s).');
    callback();
  });

});


// cache busters
var bustSrc = 
gulp.task('bust', ['bust:collect', 'bust:replace']);

// collect resources for cache busting
gulp.task('bust:collect', ['sass', 'webpack', 'copy'], function () {
	var src = [].concat(paths.public + '**/*');
  return gulp.src(src, { cwd: paths.build, base: paths.build + paths.public })
    .pipe(cachebust.resources());
});

// replace collected resources
gulp.task('bust:replace', ['bust:collect'], function () {
	gutil.log("[bust:replace]", 'Busting ' + Object.keys(cachebust.mappings).length + ' asset(s)...');
  return gulp.src(paths.views, { cwd: paths.build, base: paths.build })
    .pipe(cachebust.references())
    .pipe(gulp.dest(paths.build));
});

