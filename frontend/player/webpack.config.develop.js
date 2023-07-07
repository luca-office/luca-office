const merge = require("webpack-merge")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const config = require("./webpack.config.js")

module.exports = merge.smart(config, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 8081,
    proxy: {
      "/backend": {
        target: "http://localhost:9000",
        pathRewrite: {"^/backend": ""}
      }
    },
    overlay: true
  },
  plugins: [new ForkTsCheckerWebpackPlugin()]
})
