// Express middleware to render the app server-side and expose its state
// to the client

import React from "react";
import serialize from "serialize-javascript";

import app from "../app";
import HtmlDocument from "./HtmlDocument";

import { navigateAction } from "fluxible-router";
import { loadIntlMessages } from "../actions/IntlActionCreators";

let webpackStats;

if (process.env.NODE_ENV === "production") {
  webpackStats = require("./webpack-stats.json");
}

function renderApp(req, res, context, next) {
  try {

    if (process.env.NODE_ENV === "development") {
      webpackStats = require("./webpack-stats.json");

      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      delete require.cache[require.resolve("./webpack-stats.json")];
    }

    // dehydrate the app and expose its state
    const state = "window.App=" + serialize(app.dehydrate(context)) + ";";

    const Application = app.getComponent();

    // Render the Application to string
    const markup = React.renderToString(
      <Application context={ context.getComponentContext() } />
    );

    // The application component is rendered to static markup
    // and sent as response.
    const html = React.renderToStaticMarkup(
      <HtmlDocument
        context={ context.getComponentContext() }
        lang={req.locale}
        state={state}
        markup={markup}
        script={webpackStats.script}
        css={webpackStats.css}
      />
    );
    const doctype = "<!DOCTYPE html>";
    res.send(doctype + html);
  }
  catch (e) {
    next(e);
  }
}

function render(req, res, next) {

  // Create a fluxible context (_csrf is needed by the fetchr plugin)
  const context = app.createContext({
    req: req,
    xhrContext: {
      _csrf: req.csrfToken()
    }
  });

  // Fill the intl store with the messages according to locale and
  // execute the navigate action to fill the RouteStore
  // (here we make use of executeAction returning a promise)
  Promise.all([
      context.executeAction(loadIntlMessages, { locale: req.locale }),
      context.executeAction(navigateAction, { url: req.url })
    ]).then(() => renderApp(req, res, context, next))
      .catch((err) => {
        if (!err.statusCode || !err.status) {
          next(err);
        }
        else {
          renderApp(req, res, context, next);
        }
      });

}

export default render;
