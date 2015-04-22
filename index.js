delete process.env.BROWSER;

// Register babel to have ES6 support on the server
require("babel/register");

// Require the intl polyfill
require("./src/server/intl-polyfill");

// Start the server app
require("./src/server");
