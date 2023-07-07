module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
    [
      "@emotion/babel-preset-css-prop",
      {
        autoLabel: "always",
        labelFormat: "[local]"
      }
    ]
  ],
  plugins: [["@babel/plugin-proposal-class-properties"], "transform-inline-environment-variables"]
}
