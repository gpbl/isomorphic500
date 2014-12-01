'use strict';
var Reflux = require('reflux');

var userStarredReposActions = require('../actions/userStarredReposActions');

var repoStore = Reflux.createStore({
	listenables: [userStarredReposActions],

	init: function () {
		this._repos = {};
	},

	get: function(login) {
		return this._repos[login];
	},

	onRequestComplete: function(login, repositories) {
		 // Could use repoStore and hold only the repository names
		this._repos[login] = repositories;
		this.trigger(repositories);
	}

});

module.exports = repoStore;