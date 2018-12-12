'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.js');

const paths = require('./paths');

module.exports = merge(common, {
  bail: true,
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: paths.src,
        loader: require.resolve('babel-loader'),
        options: {
          compact: true,
        },
      },
    ]
  },
});
