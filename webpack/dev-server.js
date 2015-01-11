// starts a webpack dev server for dev environments

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from './hot.config';

const compiler = webpack(config);

const options = {
  contentBase: config.serverUrl,
  quiet: true,
  noInfo: true,
  hot: true,
  publicPath: config.output.publicPath,
  stats: { colors: true }
}

const server = new WebpackDevServer(compiler, options);

server.listen(3001, 'localhost', () => {
  console.log(`Webpack development server listening on 3001`);
});
