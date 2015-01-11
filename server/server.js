import express from 'express';
import proxy from 'proxy-middleware';
import compress from 'compression';
import locale from 'locale';
import settings from '../app/settings';
import markup from './markup.generated.js';
import { resolve } from 'path';

const app = express();
const morgan = require('morgan');

app.use(morgan(app.get('env') === 'production' ? 'combined' : 'dev'));
app.use(locale(settings.locales));
app.use(compress());

// static files
const publicPath = resolve(__dirname, '../public');
app.use(express.static(publicPath, { maxAge: 365*24*60*60 }));

// main app
app.get("/", function(req, res) {

  import stats from './webpack-stats.json';
  res.end(markup(req, `${stats.publicPath}${stats.mainChunk}`));
});

// error pages
app.use((err, req, res, next) => {
  res.status(500).send(`<pre>${err.stack}</pre>`);
});

app.set('port', process.env.PORT || 3000);

if (app.get('env') === 'development')
  require('../webpack/dev-server');

app.listen(app.get('port'), () => {
  console.log(`Express ${app.get('env')} server listening on ${app.get('port')}`);
});
