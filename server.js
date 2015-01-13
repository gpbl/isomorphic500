// enable ES6
require("6to5/register");

if (!global.Intl) require('intl');

// start express server
require('./server/index');
