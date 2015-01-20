
import express from 'express';
import compress from 'compression';
import locale from 'locale';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

import { resolve } from 'path';
import { map } from 'lodash';
import requireDir from 'require-dir';

import app from '../app';
import config from '../config/app';

// initialize express
const server = express();
const morgan = require('morgan');
const debug = require('debug')('App:Server');

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
const fetchr = app.getPlugin('FetchrPlugin');
map(requireDir('../services/'), service => fetchr.registerService(service) );

// set up fetchr middleware
server.use(fetchr.getXhrPath(), fetchr.getMiddleware());

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
  debug('Express %s server listening on %d', server.get('env'), server.get('port'));
});