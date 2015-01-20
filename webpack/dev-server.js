// Starts a webpack dev server for dev environments
// and proxies /assets to webpack dev server

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from './dev.config';
import proxy from 'proxy-middleware';
import url from 'url';

const compiler = webpack(config);

const options = {
  contentBase: 'http://localhost:3001',
  quiet: true,
  noInfo: true,
  hot: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}

const server = new WebpackDevServer(compiler, options);

export default function (app) {
  const proxyUrl = `http://localhost:3001${config.output.publicPath}`;
  app.use(config.output.publicPath, proxy(url.parse(proxyUrl)));
  server.listen(3001, 'localhost', () => {
    console.log(`Webpack development server listening on 3001 (will proxy ${config.output.publicPath})`);
  });
}