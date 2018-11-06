'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.js');

const paths = require('./paths');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: "development",
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
  ],
  output: {
    pathinfo: true,
  },
  watch: true,
  watchOptions: {
    ignored: paths.nodeModules,
  },
  performance: {
    hints: false,
  },
});
