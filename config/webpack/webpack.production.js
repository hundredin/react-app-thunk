const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

// the path(s) that should be cleaned
let pathsToClean = ["dist", "build"];

module.exports = require("./webpack.base.js")({
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/",
    filename: "[name].bundle.js"
  },
  plugins: [new CleanWebpackPlugin(pathsToClean)],
  defines: {
    LOCAL: false,
    DEV: false,
    PRODUCTION: true
  },
  mode: "development",
  templateFilePath: "src/assets/index.html"
});
