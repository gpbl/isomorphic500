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

import fluxibleApp from "./fluxibleApp";
import config from "./config";
import render from "./server/render";
import setLocale from "./server/setLocale";

const staticPath = path.resolve(__dirname, "../static");

// Initialize express server
export default function (callback) {
  const app = express();

  app.set("env", process.env.NODE_ENV || "development");
  app.set("host", process.env.HOST || "0.0.0.0");
  app.set("port", process.env.PORT || 3000);

  app.use(morgan(app.get("env") === "production" ? "combined" : "dev"));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(compression());
  app.use(serveFavicon(`${staticPath}/assets/favicon.png`));

  // Set the default locale

  locale.Locale.default = config.locales[0];

  // Set req.locale based on the browser settings

  app.use(locale(config.locales));

  // Overwrite req.locale either from cookie or querystring

  app.use(setLocale);

  // This is used by the fetchr plugin

  app.use(csurf({ cookie: true }));

  // Configure fetchr (for doing api calls server and client-side)
  // and register its services

  const fetchr = fluxibleApp.getPlugin("FetchrPlugin");
  fetchr.registerService(require("./services/photos"));
  fetchr.registerService(require("./services/photo"));

  // Use the fetchr middleware (will enable requests from /api)

  app.use(fetchr.getXhrPath(), fetchr.getMiddleware());

  // Use the `static` dir for serving static assets. On production, it contains the js
  // files built with webpack
  app.use(serveStatic(staticPath, {
    maxAge: 365 * 24 * 60 * 60
  }));

  // Render the app server-side and send it as response

  app.use(render);

  // Generic server errors (e.g. not caught by components)
  app.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
    console.log("Error on request %s %s", req.method, req.url);
    console.log(err);
    console.log(err.stack);
    res.status(500).send("Something bad happened");
  });

  // Finally, start the express server

  // Finally, start the express application
  return app.listen(app.get("port"), () => callback(app));

}

