const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  dist: path.resolve(__dirname, 'dist'),
  src: path.resolve(__dirname, 'src'),
  js: path.resolve(__dirname, 'src/js')
};

// const extractLess = new ExtractTextPlugin({
//   filename: 'style.bundle.css',
// });

module.exports = {
  entry: path.join(paths.js, 'app.js'),
  output: {
    path: paths.dist,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: '/node_modules/',
        use: [
          'css-loader'
        ]
      }
      // }, {
      //   test: /\.less$/,
      //   use: extractLess.extract({
      //     use: [{
      //       loader: 'css-loader' // translates CSS into CommonJS
      //     }, {
      //       loader: 'less-loader' // compiles Less to CSS
      //     }],
      //     fallback: 'style-loader'
      //   })
      // }
    ]
  },
  // plugins: [
  //   extractLess
  // ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};