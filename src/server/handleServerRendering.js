// Express middleware to render the app server-side and expose its state
// to the client

import React from "react";
import ReactDOMServer from "react-dom/server";
import serialize from "serialize-javascript";

import app from "../app";
import Html from "../containers/Html";

import { navigateAction } from "fluxible-router";
import { loadIntlMessages } from "../actions/IntlActionCreators";
import { IntlProvider } from "react-intl";

function renderApp(req, res, context, next) {
  try {

    // dehydrate the app and expose its state
    const state = "window.__INITIAL_STATE__=" + serialize(app.dehydrate(context)) + ";";

    const Root = app.getComponent();

    // Render the Root to string
    const content = ReactDOMServer.renderToString(
      <IntlProvider locale={ req.locale }>
        <Root context={ context.getComponentContext() } />
      </IntlProvider>
    );

    // The root component is rendered as static markup and sent as response.
    const html = ReactDOMServer.renderToStaticMarkup(
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

export default function handleServerRendering(req, res, next) {

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
  ])
    .then(() => renderApp(req, res, context, next))
    .catch(err => {
      if (err.statusCode || err.status) {
        renderApp(req, res, context, next);
        return;
      }
      next(err);
    });

}
