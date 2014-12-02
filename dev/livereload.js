// Watch public dir
var debug = require('debug')('app');
var livereload = require('livereload');
livereload.createServer().watch(__dirname + '/../public');
