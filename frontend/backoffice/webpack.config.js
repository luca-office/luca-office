const path = require("path");
const commonConfig = require("../webpack-config-common")

module.exports = {
  entry: [path.join(__dirname, "src/index.tsx")],
  output: commonConfig.output(path.resolve(__dirname)),
  resolve: commonConfig.resolve,
  module: {rules: commonConfig.rules},
  plugins: commonConfig.plugins
}
