'use strict';

var Reflux       = require('reflux');
var repoApi      = require('../utils/repoApi');
var camelizeKeys = require('humps').camelizeKeys;

var repoActions = Reflux.createActions([
	'request',
	'requestComplete',
	'requestError',
	'requestFailure'
]);

// See discussion here: https://github.com/spoike/refluxjs/issues/57
repoActions.request.preEmit = function (fullName) {
	repoApi.request(fullName)
		.end(function (err, res) {
			if (err) repoActions.requestFailure('Connection error.');
			else if (!res.ok) repoActions.requestError(res.body.message);
			else repoActions.requestComplete(camelizeKeys(res.body));
		});
};

module.exports = repoActions;