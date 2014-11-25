'use strict';

// enables JSX requires
require('node-jsx').install({ extension: '.jsx' });

var debug = require('debug')('app');
var app = require('./app');
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
	debug('Express ' + app.get('env') + ' server listening on port ' + server.address().port);
});

module.exports = server;