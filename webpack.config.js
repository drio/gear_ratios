const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
};

module.exports = {
  entry: path.join(paths.JS, 'app.js'),

  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
		new MiniCssExtractPlugin({
      filename: "style.bundle.css",
      chunkFilename: "[id].css"
    })
  ],

  // LOADERS configuration
  // We are telling webpack to use "babel-loader" for .js and .jsx files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },


      // CSS loader to CSS files
      // Files will get handled by css loader and then passed to the extract css plugin
      // which will write it to the file we defined above
			{
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              //publicPath: '../'
            }
          },
          "css-loader"
        ]
      },

			  {
         test: /\.(csv|tsv)$/,
         use: [
           'csv-loader'
         ]
       },

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      { test: /\.png$/, use: [ "url-loader?mimetype=image/png" ] },
    ],
  },
  // Enable importing JS files without specifying their's extenstion
  //
  // So we can write:
  // import MyComponent from './my-component';
  //
  // Instead of:
  // import MyComponent from './my-component.jsx';
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

