process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const { createConfig } = require('@edx/frontend-build');

const config = createConfig('webpack-prod');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

Object.assign(config, {
  entry: {
    // UPDATE ME
    "edx-webpack-xblock": path.resolve(
      process.cwd(),
      // UPDATE ME
      'edx_webpack_xblock/static/js/src/main.js'
    ),
  },
  output: {
    // UPDATE ME
    path: path.resolve(process.cwd(), 'edx_webpack_xblock/static/dist'),
  },
  optimization: {},
  plugins: [
    // Cleans the dist directory before each build
    new CleanWebpackPlugin(),
    new Dotenv({
      path: path.resolve(process.cwd(), '.env'),
      systemvars: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
});

config.resolve.modules = ['node_modules'].concat(
  // UPDATE ME
  path.resolve(__dirname, 'edx_webpack_xblock/static/js/src')
);

module.exports = config;
