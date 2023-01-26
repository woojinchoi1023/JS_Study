const path = require('path');
const RefreshWEbpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports = {
  name: 'wordRelay-setting',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js' , '.jsx']
  },

  entry: { //입력
    app: ['./client'],
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties',
      'react-refresh/babel']
      }
    }]
  },
  plugins: [
    new RefreshWEbpackPlugin()
  ],
  output: { //출력
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
  
  devServer: {
    hot: true,
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
  }
}