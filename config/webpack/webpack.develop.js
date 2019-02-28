const webpack = require("webpack");
const path = require("path");

module.exports = require("./webpack.base.js")({
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/",
    filename: "[name].bundle.js"
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  defines: {
    LOCAL: false,
    DEV: true,
    PRODUCTION: false
  },
  mode: "production",
  devtool: "source-map",
  templateFilePath: "src/assets/index.dev.html"
});
