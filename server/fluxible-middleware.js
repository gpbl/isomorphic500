import { navigateAction } from 'flux-router-component';
import serialize from 'serialize-javascript';
import React from 'react';
import app from '../app';
import Html from '../components/Html.jsx';

// This middleware 
// 1. creates a fluxible context for each request
// 2. navigates the router to the requested url
// 3. dehydrate the app's context
// 4. render the html as string and send it as response 

export default function (req, res, next) {

  // create the context for this request
  // (the argument is needed by the fetchr plugin)
  const ctx = app.createContext({
    req: req,
    xhrContext: {
      _csrf: req.csrfToken(),
      lang: 'en-US'
    }
  });

  const actionCtx = ctx.getActionContext();
  const payload = { url: req.url, locale: req.locale };

  actionCtx.executeAction(navigateAction, payload, (err) => {
    if (err) {
      if (err.status && err.status === 404) next();
      else next(err);
      return;
    }
    try {

    // dehydrate app status
    const exposed = `window.App=${serialize(app.dehydrate(ctx), 'App')};`;

    const AppComponent = app.getAppComponent();
    const HtmlComponent = React.createFactory(Html);

    const markup = React.renderToString(
      AppComponent({ context: ctx.getComponentContext() })
    );

    var html;
      html = React.renderToStaticMarkup(
        HtmlComponent({
          locale: req.locale,
          state: exposed,
          context: ctx.getComponentContext(),
          markup: markup
        })
      );
    } 
    catch (err) { next(err); return; }
    
    res.status(200).send('<!DOCTYPE html>' + html);
  });
}