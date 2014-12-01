'use strict';
var Reflux = require('reflux');

var userActions = require('../actions/userActions');

var repoStore = Reflux.createStore({
	listenables: [userActions],

	init: function () {
		this._users = {};
	},

	get: function(fullName) {
		return this._users[fullName];
	},

	onRequestComplete: function(user) {
		this._users[user.login] = user;
		this.trigger(user);
	}

});

module.exports = repoStore;