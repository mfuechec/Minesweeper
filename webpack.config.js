const path = require('path');
module.exports = {
  entry: './client/index.jsx', // where webpack will START transpiling from
  output: {
    path: path.resolve(__dirname, 'public'), // where webpack will put the compiled file
    filename: 'bundle.js', // name of compiled code file
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devServer: {
    contentBase: './public', // this option is used for my "start client" script
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
      { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
    ]
  },
  devtool: "source-map"
};