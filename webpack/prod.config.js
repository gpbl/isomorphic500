// Webpack config for creating the production bundle.

require("babel/register");

var path = require("path");
var webpack = require("webpack");
var writeStats = require("./plugins/write-stats");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var assetsPath = path.join(__dirname, "../public/assets");

module.exports = {
  name: "Development",
  entry: {
    "main": "./src/client.js"
  },
  output: {
    path: assetsPath,
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" },
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel"] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!autoprefixer?browsers=last 2 version!sass") }
    ]
  },
  progress: true,
  plugins: [

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin("[name]-[chunkhash].css"),

    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify("production")
      }
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
    }),

    // stats
    function() { this.plugin("done", writeStats); }
  ]
};
