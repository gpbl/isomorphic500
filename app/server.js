import path from "path";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import domain from "express-domain-middleware";
import morgan from "morgan";
import csurf from "csurf";


import webpackDevServer from "../webpack/dev-server";
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

// Binds incoming requests responses from express to a nodejs domain
// (helps with uncaught errors)
server.use(domain);
if (server.get("env") === "production") {
  // On production, use the public dir for static files
  // The public dir is created by webpack on build time.
  server.use(express.static(path.resolve(__dirname, "../public"), {
    maxAge: 365 * 24 * 60 * 60
  }));
}

// Render the app server-side and send it as response
server.use(render);

server.set("host", process.env.HOST || "localhost");
server.set("port", process.env.PORT || 3000);

if (server.get("env") === "development") {
  webpackDevServer();
}

server.listen(server.get("port"), server.get("host"), () => {
  debug(`Express %s server listening on %s:%s`, server.get("env"), server.get("host"), server.get("port"));
});
