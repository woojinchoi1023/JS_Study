const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', //실서비스 production
  devtool: 'eval',
  entry: {
    app: './client.jsx',
  },

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
          targets: {
            browsers: ['> 5% in KR', 'last 2 chrome versions'],
            },
          }], '@babel/preset-react'
        ],
      },
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({debug: true}),
  ],
  output : {
    path: __dirname,
    filename: 'app.js'
  },
}