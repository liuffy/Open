var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/open.jsx",
  output: {
    path: path.join(__dirname,'frontend'),
    filename: "bundle.js"
  },
   node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
      fs: "empty"
    },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  // include source-map devtool
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".jsx" ]
  }
};