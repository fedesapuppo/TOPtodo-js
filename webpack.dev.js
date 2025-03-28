const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
    hot: true,
    open: true,
    watchFiles: ["src/**/*"],
    port: 8080,
    historyApiFallback: true,
  },
});
