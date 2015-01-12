// enable ES6
require("6to5/register");

// fix ssl issues https://github.com/visionmedia/superagent/issues/188
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// start express server
require('./server/index');
