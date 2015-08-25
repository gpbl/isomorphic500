// Express middleware to render the app server-side and expose its state
// to the client

import React from "react";
import serialize from "serialize-javascript";

import fluxibleApp from "../fluxibleApp";
import Html from "../components/Html";

import { navigateAction } from "fluxible-router";
import { loadIntlMessages } from "../actions/IntlActionCreators";

function renderApp(req, res, context, next) {
  try {

    // dehydrate the app and expose its state
    const state = "window.__INITIAL_STATE__=" + serialize(fluxibleApp.dehydrate(context)) + ";";

    const Application = fluxibleApp.getComponent();

    // Render the Application to string
    const content = React.renderToString(
      <Application context={ context.getComponentContext() } />
    );

    // The application component is rendered to static content
    // and sent as response.
    const html = React.renderToStaticMarkup(
      <Html
        context={ context.getComponentContext() }
        lang={ req.locale }
        state={ state }
        content={ content }
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
  const context = fluxibleApp.createContext({
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
  ])
    .then(() => renderApp(req, res, context, next))
    .catch((err) => {
      if (err.statusCode || err.status) {
        renderApp(req, res, context, next);
        return;
      }
      next(err);
    });

}

export default render;
