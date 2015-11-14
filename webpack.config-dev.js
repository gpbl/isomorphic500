// This is the webpack config to use during development.
// It enables the hot module replacement, the source maps and inline CSS styles.

/* eslint no-var: 0, no-console: 0 */

import webpack from "webpack";
import WebpackErrorNotificationPlugin from "webpack-error-notification";

const config = {
  devtool: "source-map",
  entry: [
    "webpack-hot-middleware/client",
    "./src/client.js"
  ],
  output: {
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    path: "/",
    publicPath: "/assets/"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          "env": {
            "development": {
              "plugins": ["react-transform"],
              "extra": {
                "react-transform": {
                  "transforms": [{
                    "transform": "react-transform-hmr",
                    "imports": ["react"],
                    "locals": ["module"]
                  }, {
                    "transform": "react-transform-catch-errors",
                    "imports": ["react", "redbox-react"]
                  }]
                }
              }
            }
          }
        }
      },
      { test: /\.scss$/, loaders: ["style", "css", "autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true"] },
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" }
    ]
  },
  plugins: [

    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        BROWSER: JSON.stringify(true)
      }
    }),
    new WebpackErrorNotificationPlugin()
  ]

};

export default config;
