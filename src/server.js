import path from "path";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import domain from "express-domain-middleware";
import morgan from "morgan";
import csurf from "csurf";

import startDevServer from "../webpack/server";
import mockServer from "../mockserver";
import render from "./server/render";

const debug = require("debug")("isomorphic500");

// Initialize express server
const server = express();

// Usual express stuff
server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());
server.use(favicon(path.resolve(__dirname, "./assets/favicon.png")));

// This is used by the fetchr plugin
server.use(csurf({ cookie: true }));

// Binds incoming requests to a nodejs domain
// (avoids to crash the server on uncaught errors)
server.use(domain);

if (server.get("env") === "production") {
  // On production, use the public directory for static files
  // The directory is created by webpack on build time.
  server.use(express.static(path.resolve(__dirname, "../public"), {
    maxAge: 365 * 24 * 60 * 60
  }));
}
else {
  // On development, serve the static files from the webpack dev server.
  startDevServer();
}

// Start a mock server to use for our API requests
server.use("/service", mockServer);

// Render the app server-side and send it as response
server.use(render);

// Start the express server
server.set("host", process.env.HOST || "localhost");
server.set("port", process.env.PORT || 3000);

server.listen(server.get("port"), server.get("host"), () => {
  debug(`Express %s server listening on %s:%s`, server.get("env"), server.get("host"), server.get("port"));
});

