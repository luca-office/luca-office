const webpackConfigCommon = require("../../webpack-config-common")

module.exports = {
  typescript: {
    check: true,
    checkOptions: {
      enabled: true
    },
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  },
  webpackFinal: async config => ({
    ...config,
    module: {
      ...config.module,
      rules: webpackConfigCommon.rules
    },
    resolve: webpackConfigCommon.resolve
  }),
  stories: ["../stories/modules.tsx", "../stories/office-tools.tsx"],
  addons: [
    "@storybook/addon-knobs/preset",
    "@storybook/addon-actions/register",
    "@storybook/addon-backgrounds/register"
  ]
}
