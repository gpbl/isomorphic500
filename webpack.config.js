module.exports = {
  // Entry point for static analyzer:
  entry: './src/client/main',

  output: {
    // Where to put build results when doing production builds:
    // (Server doesn't write to the disk, but this is required.)
    path: __dirname,

    // Filename to use in HTML
    filename: 'main.js',

    // Path to use in HTML
    publicPath: '/js/'
  },

  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      // Pass *.jsx files through jsx-loader transform
      { test: /\.jsx$/, loader: 'jsx' },
    ]
  },

  externals: {
    // Showdown is not is node_modules,
    // so we tell Webpack to resolve it to a global
    // 'showdown': 'window.Showdown'
  }
};