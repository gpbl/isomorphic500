// This is the webpack config to use during development.
// It enables the hot module replacement, the source maps and inline CSS styles.

import path from "path";
import webpack from "webpack";
import writeStats from "./utils/write-stats";
import notifyStats from "./utils/notify-stats";

const assetsPath = path.resolve(__dirname, "../public/assets");

const WEBPACK_HOST = "localhost";
const WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

export default {
  devtool: "eval",
  entry: {
    "main": [
      `webpack-dev-server/client?http://${WEBPACK_HOST}:${WEBPACK_PORT}`,
      "webpack/hot/only-dev-server",
      "./src/client.js"
    ]
  },
  output: {
    path: assetsPath,
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: `http://${WEBPACK_HOST}:${WEBPACK_PORT}/assets/`
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" },
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel"] },
      { test: /\.scss$/, loader: "style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true" }
    ]
  },
  progress: true,
  plugins: [

    // Fix issue with fluxible 0.4
    // see https://github.com/gpbl/isomorphic500/issues/29
    new webpack.IgnorePlugin(/vertx/),

    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    // print a webpack progress
    new webpack.ProgressPlugin((percentage, message) => {
      const MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
      const CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();
      process.stdout.write(`${CLEAR_LINE}${Math.round(percentage * 100)}%: ${message}${MOVE_LEFT}`);
    }),

    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify("development")
      }
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    // stats
    function() { this.plugin("done", notifyStats); },
    function() { this.plugin("done", writeStats); }

  ]
};
