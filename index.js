/* eslint no-console: 0, no-var: 0 */

// Register babel to have ES6 support on the server
require("babel/register");

// Require the intl polyfill
require("./src/server/intl-polyfill");

// Prevent issues with libraries using this var (see http://tinyurl.com/pcockwk)
delete process.env.BROWSER;

require("./src/server")(function (app) {
  console.log("Express %s server listening on %s:%s", app.get("env"), app.get("host"), app.get("port"));

  if (app.get("env") === "development") {
    require("./webpack/server")();
  }

});
