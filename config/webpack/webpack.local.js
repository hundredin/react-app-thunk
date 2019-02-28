'use strict'
const webpack = require('webpack')
const path = require('path')

module.exports = require("./webpack.base.js")({
  entry: [
    "@babel/polyfill",
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:4000",
    "webpack/hot/only-dev-server",
    "./src/index.js"
  ],
  output: {
    path: path.resolve(process.cwd(), "public"),
    publicPath: "/",
    filename: "[name].bundle.js"
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    mainFields: ["main", "browser"]
  },
  externals: {},
  performance: {
    hints: false
  },
  defines: {
    LOCAL: true,
    DEV: false,
    PRODUCTION: false
  },
  mode: "development",
  devtool: "cheap-module-source-map",
  templateFilePath: "src/assets/index.dev.html"
});
