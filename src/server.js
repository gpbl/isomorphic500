/* eslint no-console: 0 */

import path from "path";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import morgan from "morgan";
import csurf from "csurf";
import locale from "locale";
import app from "./app";
import config from "./config";
import render from "./server/render";
import setLocale from "./server/setLocale";

// Initialize express server

const server = express();

// Usual express stuff

server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());
server.use(favicon(path.resolve(__dirname, "./assets/favicon.png")));

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

// On production, use the public directory for static files
// This directory is created by webpack on build time.

if (server.get("env") === "production") {
  server.use(express.static(path.resolve(__dirname, "../public"), {
    maxAge: 365 * 24 * 60 * 60
  }));
}

// On development, serve the static files from the webpack dev server.

if (server.get("env") === "development") {
  require("../webpack/server");
}

// Render the app server-side and send it as response

server.use(render);

// Generic server errors (e.g. not caught by components)
server.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
  console.log("Error on request %s %s", req.method, req.url);
  console.log(err);
  console.log(err.stack);
  res.status(500).send("Something bad happened");
});

// Finally, start the express server

server.set("port", process.env.PORT || 3000);

server.listen(server.get("port"), () => {
  console.log(`Express ${server.get("env")} server listening on ${server.get("port")}`);
});

