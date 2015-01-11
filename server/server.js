import { resolve } from 'path';

import express from 'express';
import proxy from 'proxy-middleware';
import compress from 'compression';
import locale from 'locale';
import expstate from 'express-state';
import fluxible from './fluxible-middleware';

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
server.use(fluxible);

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
