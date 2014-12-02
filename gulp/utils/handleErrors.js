/**
 * Copyright (c) 2014 Call-Em-All
 * https://github.com/callemall/material-ui/blob/master/LICENSE
 */

'use strict';
var notify = require("gulp-notify");

module.exports = function () {

	var args = Array.prototype.slice.call(arguments);

	// Send error to notification center with gulp-notify
	notify.onError({
		title: "Compile Error",
		message: "<%= error.message %>"
	}).apply(this, args);

	// Keep gulp from hanging on this task
	this.emit('end');
};