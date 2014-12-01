'use strict';
var api = require('./api');
var userApi = {
	request: function (login) {
		return api.request('/users/' + login);
	}
};

module.exports = userApi;