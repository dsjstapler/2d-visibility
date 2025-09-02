const path = require('path');

module.exports = {
  entry: './src/main.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript'
              ]
            }
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      // {
      //   test: /\.jsx?$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   },
      //   exclude: /node_modules/
      // }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '.')
    },
    hot: true,
    open: true
  }
};
