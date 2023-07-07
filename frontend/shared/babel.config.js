module.exports = {
  presets: [
    ["@babel/preset-env", {targets: {node: "current"}}],
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
  plugins: [["@babel/plugin-proposal-class-properties"]]
}
