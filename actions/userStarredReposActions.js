'use strict';

var Reflux       = require('reflux');
var repoApi      = require('../utils/repoApi');
var camelizeKeys = require('humps').camelizeKeys;

var UserStarredReposActions = Reflux.createActions([
	'request',
	'requestComplete',
	'requestError',
	'requestFailure'
]);

// See discussion here: https://github.com/spoike/refluxjs/issues/57
UserStarredReposActions.request.preEmit = function (login) {
	repoApi.requestStarredBy(login)
		.end(function (err, res) {
			if (err) UserStarredReposActions.requestFailure('Connection error.');
			else if (!res.ok) UserStarredReposActions.requestError(res.body.message);
			else UserStarredReposActions.requestComplete(login, camelizeKeys(res.body));
		});
};

module.exports = UserStarredReposActions;