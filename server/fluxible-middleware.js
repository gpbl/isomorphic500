// Express middleware for sending the html response to the client
// Creates a new context for each request.

import { navigateAction } from 'flux-router-component';
import fluxibleApp from './fluxible-app';

export default function (req, res, next) {

  const context = fluxibleApp.createContext();
  const actionContext = context.getActionContext();

  actionContext.executeAction(navigateAction, {
    url: req.url
  }, (err) => {

    if (err) {
      if (err.status && err.status === 404) next();
      else next(err);
      return;
    }

    res.expose(fluxibleApp.dehydrate(context), 'App');

    // where the mainScript (client) is located according to the last webpack's 
    // build (webpack/browser.config in production or webpack/hot.config in dev)
    import stats from './webpack-stats.json';
    res.locals.mainScript = `${stats.publicPath}${stats.mainChunk}`;
    res.locals.context = context.getComponentContext();
    // use html from webpack-compiled main.jsx
    import html from './main.generated';

    res.status(200).send(html(req, res));

  });

}