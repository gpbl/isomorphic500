import { resolve } from 'path';

import express from 'express';
import compress from 'compression';
import locale from 'locale';
import serialize from 'serialize-javascript';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import React from 'react';

import config from '../config/app';

// fluxible app stuff
import { navigateAction } from 'flux-router-component';
import app from '../app';

// initialize express
const server = express();
const morgan = require('morgan');
server.use(morgan(server.get('env') === 'production' ? 'combined' : 'dev'));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(locale(config.locales));
server.use(compress());
server.use(csurf({ cookie: true }));

if (server.get('env') === 'development')
  require('../webpack/dev-server')(server);

// static files
const publicPath = resolve(__dirname, '../public');
server.use(express.static(publicPath, { maxAge: 365*24*60*60 }));

// get access to the fetchr plugin instance (fetchr is plugged in ../app.js)
const fetchrPlugin = app.getPlugin('FetchrPlugin');
// register our services 
fetchrPlugin.registerService(require('../services/500px'));
fetchrPlugin.registerService(require('../services/i18n'));
// and set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// render fluxible app
server.use(function (req, res, next) {

  // create a fluxible context for each request
  // (the argument is needed by the fetchr plugin)
  const context = app.createContext({
    req: req, 
    xhrContext: { _csrf: req.csrfToken(), lang: 'en-US' }
  });

  const actionContext = context.getActionContext();

  actionContext.executeAction(navigateAction, { url: req.url, locale: req.locale }, (err) => {
    
    if (err) {
      if (err.status && err.status === 404) next();
      else next(err);
      return;
    }

    // dehydrate app status
    const exposed = `window.App=${serialize(app.dehydrate(context), 'App')};`;

    // pass context through locals
    res.locals.context = context.getComponentContext();
    
    const AppComponent = app.getAppComponent();
    const HtmlComponent = React.createFactory(require('../components/Html.jsx'));

    var html;
    try {
      html = React.renderToStaticMarkup(
        HtmlComponent({
          locale: req.locale,
          state: exposed,
          context: context.getComponentContext(),
          markup: React.renderToString(AppComponent({
            context: context.getComponentContext()
          }))
        })
      );
    }
    catch(e) { next(e); return; }
    res.status(200).send('<!DOCTYPE html>' + html);
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

server.listen(server.get('port'), () => {
  console.log(`Express ${server.get('env')} server listening on ${server.get('port')}`);
});
