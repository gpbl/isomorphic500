// only for production
// (run webpack with this config after the deploy)
var browser = require('./webpack/client.config');
var server = require('./webpack/server.config');

module.exports = [browser, server];