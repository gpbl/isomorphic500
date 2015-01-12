module.exports = {
  loaders: [
    { test: /\.jpg$/, loader: 'file-loader' },
    { test: /\.svg$/, loader: "url-loader?limit=100000&mimetype=image/svg+xml" }
  ],
  publicPath: '/assets/'
}