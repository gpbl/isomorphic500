'use strict';

var Reflux       = require('reflux');
var userApi      = require('../utils/userApi');
var camelizeKeys = require('humps').camelizeKeys;

var userActions = Reflux.createActions([
	'request',
	'requestComplete',
	'requestError',
	'requestFailure'
]);

// See discussion here: https://github.com/spoike/refluxjs/issues/57
userActions.request.preEmit = function (name) {
	userApi.request(name)
		.end(function (err, res) {
			if (err) userActions.requestFailure('Connection error.');
			else if (!res.ok) userActions.requestError(res.body.message);
			else userActions.requestComplete(camelizeKeys(res.body));
		});
};

module.exports = userActions;