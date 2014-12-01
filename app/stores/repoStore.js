'use strict';
var Reflux = require('reflux');

var repoActions = require('../actions/repoActions');

var repoStore = Reflux.createStore({
	listenables: [repoActions],

	init: function () {
		this._repositories = {};
	},

	get: function(fullName) {
		return this._repositories[fullName];
	},

	onRequestComplete: function(repository) {
		this._repositories[repository.fullName] = repository;
		this.trigger(repository);
	}

});

module.exports = repoStore;