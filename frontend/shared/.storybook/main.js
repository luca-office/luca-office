const webpackConfigCommon = require("../../webpack-config-common")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

module.exports = {
  typescript: {
    check: true,
    checkOptions: {
      enabled: true
    },
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async config => ({
    ...config,
    module: {
      ...config.module,
      rules: webpackConfigCommon.rules
    },
    resolve: webpackConfigCommon.resolve,
    plugins: [...config.plugins, new ForkTsCheckerWebpackPlugin()]
  }),
  stories: ["../stories/components.tsx"],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
  ]
}
