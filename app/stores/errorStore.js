'use strict';
var Reflux = require('reflux');

var repoActions = require('../actions/repoActions');
var userActions = require('../actions/userActions');

var errorStore = Reflux.createStore({
	init: function() {
		this.listenTo(repoActions.requestError, this.trigger);
		this.listenTo(repoActions.requestFailure, this.trigger);
		this.listenTo(userActions.requestError, this.trigger);
		this.listenTo(userActions.requestFailure, this.trigger);
	}
});

module.exports = errorStore;