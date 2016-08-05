var webpack = require('webpack');
var config = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    METEOR: JSON.stringify('meteor-env')
  }
});

var cssExtractPlugin = new ExtractTextPlugin('styles.css');

config.devtool = '';
config.output.pathinfo = false;
config.entry = [ './cliebt/main.js' ];
config.plugins.unshift(productionPlugin);
config.plugins.push(cssExtractPlugin);

config.module.loaders = [
  {
    test: /\.js$/,
    exclude: /(node_modules)/,
    loaders: [ 'babel' ]
  },
  {
    test: /\.(png|jpg)$/,
    exclude: /(node_modules)/,
    loader: 'url-loader?name=images/[name].[ext]&limit=8192'
  }
];

module.exports = config;
