'use strict';
var api = require('./api');

var repoApi = {
	request: function (fullName) {
		var owner = fullName.split('/')[0];
		var name = fullName.split('/')[1];
		return api.request('/repos/' + owner + '/' + name);
	},
	requestStarredBy: function(owner) {
		return api.request('/users/' + owner + '/starred');	
	}
};

module.exports = repoApi;