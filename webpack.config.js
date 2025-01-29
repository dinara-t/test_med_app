// Import the 'path' module, which provides utilities for working with file paths
const path = require('path');

// Import the UglifyJsPlugin, which is used for minifying JavaScript code
const TerserPlugin = require('terser-webpack-plugin');

// Import the MiniCssExtractPlugin, which is used for extracting CSS into a separate file
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Export the Webpack configuration as an object
module.exports = {
  // Specify the entry point of the application, which is the file that Webpack will start building from
  entry: './src/index.js',

  // Specify the output configuration
  output: {
    // Specify the path where the output file will be generated
    path: path.resolve(__dirname, 'dist'),
    // Specify the filename of the output file
    filename: 'bundle.js',
  },

  // Specify the module configuration
  module: {
    // Specify an array of rules for processing different types of files
    rules: [
      {
        // Specify a rule for processing JavaScript files
        test: /\.js$/,
        // Exclude files in the node_modules directory from being processed
        exclude: /node_modules/,
        // Use the babel-loader to process JavaScript files
        use: 'babel-loader',
      },
      {
        // Specify a rule for processing CSS files
        test: /\.css$/,
        // Use the MiniCssExtractPlugin.loader and css-loader to process CSS files
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
optimization: {
  minimize: true,
  minimizer: [new TerserPlugin()],
},
  // Specify an array of plugins to use
  plugins: [
    // Use the UglifyJsPlugin to minify the JavaScript code
    // Use the MiniCssExtractPlugin to extract CSS into a separate file
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
  ],
};