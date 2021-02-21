const path = require('path')

module.exports = {
  entry: './src/index.ts',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  output: {
    library: 'AwDA',
    libraryTarget: 'var',

    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
}