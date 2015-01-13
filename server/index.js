import { resolve } from 'path';

import express from 'express';
import compress from 'compression';
import locale from 'locale';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

import app from '../app';
import config from '../config/app';


// initialize express
const server = express();
const morgan = require('morgan');

server.use(morgan(server.get('env') === 'production' ? 'combined' : 'dev'));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(locale(config.locales));
server.use(compress());
server.use(csurf({ cookie: true }));

// start webpack dev server + proxy on dev
if (server.get('env') === 'development')
  require('../webpack/dev-server')(server);

// static files
const publicPath = resolve(__dirname, '../public');
server.use(express.static(publicPath, { maxAge: 365*24*60*60 }));

// configure fetchr (for doing api calls server and client-side)
const fetchrPlugin = app.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(require('../services/500px'));
fetchrPlugin.registerService(require('../services/i18n'));

// set up fetcher middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// fluxible server-side rendering middleware
server.use(require('./fluxible-middleware'));

// not found
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