var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    application: "./counters_app/main"
  },
  output: {
      path: __dirname + '/../static/scripts',
      filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel!jsx-loader'
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader?strictMath&cleancss"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'] 
  }
};

// { test: /\/marty\//, loader: "babel-loader" }