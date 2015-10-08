/* eslint no-console: 0 */

import path from "path";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import serveStatic from "serve-static";
import serveFavicon from "serve-favicon";
import morgan from "morgan";
import csurf from "csurf";
import locale from "locale";

import app from "./app";
import config from "./config";
import handleServerRendering from "./server/handleServerRendering";
import setLocale from "./server/setLocale";

const staticPath = path.resolve(__dirname, "../static");

// Initialize express server
export default function(callback) {
  const server = express();

  server.set("env", process.env.NODE_ENV || "development");
  server.set("host", process.env.HOST || "0.0.0.0");
  server.set("port", process.env.PORT || 3000);

  server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(compression());
  server.use(serveFavicon(`${staticPath}/assets/favicon.png`));

  // Set the default locale

  locale.Locale.default = config.locales[0];

  // Set req.locale based on the browser settings

  server.use(locale(config.locales));

  // Overwrite req.locale either from cookie or querystring

  server.use(setLocale);

  // This is used by the fetchr plugin

  server.use(csurf({ cookie: true }));

  // Configure fetchr (for doing api calls server and client-side)
  // and register its services

  const fetchr = app.getPlugin("FetchrPlugin");
  fetchr.registerService(require("./services/photos"));
  fetchr.registerService(require("./services/photo"));

  // Use the fetchr middleware (will enable requests from /api)

  server.use(fetchr.getXhrPath(), fetchr.getMiddleware());

  // Use the `static` dir for serving static assets. On production, it contains the js
  // files built with webpack
  server.use(serveStatic(staticPath, {
    maxAge: 365 * 24 * 60 * 60
  }));

  // Render the server server-side and send it as response

  server.use(handleServerRendering);

  // Generic server errors (e.g. not caught by components)
  server.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
    console.log("Error on request %s %s", req.method, req.url);
    console.log(err);
    console.log(err.stack);
    res.status(500).send("Something bad hserverened");
  });

  // Finally, start the express server
  return server.listen(server.get("port"), () => callback(server));

}

