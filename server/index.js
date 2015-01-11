import { resolve } from 'path';

import express from 'express';
import proxy from 'proxy-middleware';
import compress from 'compression';
import locale from 'locale';
import expstate from 'express-state';

import { navigateAction } from 'flux-router-component';

import app from '../app';
import config from '../config/app';

const server = express();
const morgan = require('morgan');

// used to rehydrate the store states
expstate.extend(server);

server.use(morgan(server.get('env') === 'production' ? 'combined' : 'dev'));
server.use(locale(config.locales));
server.use(compress());

// static files
const publicPath = resolve(__dirname, '../public');
server.use(express.static(publicPath, { maxAge: 365*24*60*60 }));

// render fluxible app
server.use(function (req, res, next) {

  const context = app.createContext();
  const actionContext = context.getActionContext();

  actionContext.executeAction(navigateAction, { url: req.url }, (err) => {
    if (err) {
      if (err.status && err.status === 404) next();
      else next(err);
      return;
    }

    // dehydrate app status
    res.expose(app.dehydrate(context), 'App');

    // where the mainScript (client) is located according to the last webpack's 
    // build (webpack/browser.config in production or webpack/hot.config in dev)
    import stats from './webpack-stats.json';
    res.locals.mainScript = `${stats.publicPath}${stats.mainChunk}`;

    // pass context through locals
    res.locals.context = context.getComponentContext();

    // use html from webpack-compiled html.jsx
    import html from './html.generated';

    res.status(200).send(html(req, res));

  });
});


server.use((req, res, next) => {
  res.status(404).send("Not found.");
});

// error pages
server.use((err, req, res, next) => {
  res.status(500).send(`<pre>${err.stack}</pre>`);
});

server.set('port', process.env.PORT || 3000);

if (server.get('env') === 'development')
  require('../webpack/dev-server');

server.listen(server.get('port'), () => {
  console.log(`Express ${server.get('env')} server listening on ${server.get('port')}`);
});
