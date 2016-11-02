var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'static/webpack');
var APP_DIR = path.resolve(__dirname, 'static/js');

//TODO: add instructions about how to setup webpack into README
//./node_modules/webpack/bin/webpack.js -p --config ./webpack-prod.config.js - add this to build script

var config = {
    devtool: 'source-map',
    context: APP_DIR,
    entry:{
      bundle: [APP_DIR + '/index.jsx']
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
          "process.env": {
             NODE_ENV: JSON.stringify("production")
           }
        })
    ],
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

module.exports = config;/**
 * Created by yura on 11/2/16.
 */
