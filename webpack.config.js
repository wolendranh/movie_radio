var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'static/webpack');
var APP_DIR = path.resolve(__dirname, 'static/js');

//TODO: add instructions about how to setup webpack into README

var config = {
  devtool: 'source-map',
  context: APP_DIR,
  entry:{
      app: [APP_DIR + '/index.jsx'],
      admin: [APP_DIR + '/admin_app.jsx']
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};

module.exports = config;