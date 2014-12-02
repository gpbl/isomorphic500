'use strict';

var superagent = require('superagent');
var API_ROOT = 'https://api.github.com';

// debugger;
module.exports = {
	request: function (path) {
		return superagent(API_ROOT + path);
	}
};