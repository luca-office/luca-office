const merge = require("webpack-merge")
const config = require("./webpack.config.js")
const commonConfig = require("../webpack-config-common")

module.exports = merge.smart(config, {
  mode: "production",
  plugins: commonConfig.plugins.concat(commonConfig.productionPlugins)
})
