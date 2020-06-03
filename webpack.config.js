const path = require('path');
module.exports = {
  entry: './client/index.jsx', // where webpack will START transpiling from
  output: {
    path: path.resolve(__dirname, 'public'), // where webpack will put the compiled file
    filename: 'bundle.js', // name of compiled code file
  },
  devServer: {
    contentBase: './public', // this option is used for my "start client" script
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //find all .js and .jsx files
        exclude: /node_modules/, //exclude node modules
        use: {
          loader: 'babel-loader', //use babel loader to transpile
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // use the ES6 and React presets with babel
          },
        },
      },
    ],
  },
};