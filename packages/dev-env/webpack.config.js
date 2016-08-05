var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var Package = _global_.Package;

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './client/main.js'
  ],
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'The Check Network Client',
      template: './main.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [ 'react-hot', 'babel' ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?name=images/[name].[ext]&limit=8192'
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?^_*.[name].[ext]_[version]'
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, '..', 'app'),
    extensions: [ '', '.js', '.jsx', '.json', '.css', '.styl', '.png', '.jpg', '.jpeg', '.gif', 'less', 'sass', 'scss' ]
  },
  postcss: function () {
    if (Package['fourseven.scss']) return [];
    return [ autoprefixer ];
  }
};
