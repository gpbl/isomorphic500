// Express middleware to render the app server-side and expose its state
// to the client

import React from "react";
import serialize from "serialize-javascript";
import { FluxibleComponent } from "fluxible";
import { navigateAction } from "flux-router-component";

import app from "../app";
import HtmlDocument from "./HtmlDocument";

import RouteActionCreators from "../actions/RouteActionCreators";

let webpackStats;

if (process.env.NODE_ENV === "production") {
  webpackStats = require("./webpack-stats.json");
}

function renderApp(res, context) {

  if (process.env.NODE_ENV === "development") {
    webpackStats = require("./webpack-stats.json");
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve("./webpack-stats.json")];
  }

  // dehydrate the app and expose its state
  const state = "window.App=" + serialize(app.dehydrate(context)) + ";";

  const ApplicationComponent = app.getComponent();

  // Render the Application to string using the fluxible context
  const markup = React.renderToString(
    <FluxibleComponent context={context.getComponentContext()}>
      <ApplicationComponent />
    </FluxibleComponent>
  );

  // The application component is rendered to static markup
  // and sent as response.
  const html = React.renderToStaticMarkup(
    <HtmlDocument
      state={state}
      markup={markup}
      scripts={webpackStats.main}
    />
  );
  const doctype = "<!DOCTYPE html>";
  res.send(doctype + html);
}

function renderMiddleware(req, res) {

  // create a fluxible context
  const context = app.createContext({
    req: req,
    xhrContext: {
      _csrf: req.csrfToken() // needed by the fetchr plugin
    }
  });

  context.executeAction(navigateAction, {url: req.url}, (err) => {

    // If the navigate action sends an error, execute an action to make
    // the RouteStore register the error and show the relative page.
    if (err) {
      if (err.status === 404 || err.statusCode === 404) {
        res.status(404);
        context.executeAction(RouteActionCreators.show404, { err: err }, () => {
          renderApp(res, context);
        });
      }
      else {
        res.status(500);
        context.executeAction(RouteActionCreators.show500, { err: err }, () => {
          console.log(err.stack || err);
          renderApp(res, context);
        });
      }
      return;
    }

    renderApp(res, context);

  });

}

export default renderMiddleware;
