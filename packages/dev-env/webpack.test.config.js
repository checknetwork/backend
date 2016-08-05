var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
  output: {
    // YOU NEED TO SET libraryTarget: 'commonjs2'
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [ {
      test: /\.(png|jpg)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'url-loader?name=images/[name].[ext]&limit=8192'
    } ],
  },
  resolve: {
    root: path.join(__dirname, '..', 'app'),
    extensions: [ '', '.js', '.jsx', '.json', '.css', '.styl', '.png', '.jpg', '.jpeg', '.gif' ]
  }
};
