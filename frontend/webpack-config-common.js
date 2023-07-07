const path = require("path")
const CompressionPlugin = require("compression-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin")

const output = directoryPath => ({
  path: path.resolve(directoryPath, "dist"),
  filename: "index.[hash].js",
  chunkFilename: "[id].[hash].js"
})

const rules = [
  {
    test: /\.(less|css)$/,
    use: ["style-loader", "css-loader"]
  },
  {
    type: "javascript/auto",
    test: /\.mjs$/,
    use: [
      {
        loader: "babel-loader"
      }
    ]
  },
  {
    test: /\.tsx?$/,
    loader: "babel-loader"
  },
  {
    test: /\.(png|jpg|gif)$/,
    loader: "file-loader"
  },
  {
    test: /\.svg$/,
    oneOf: [
      {
        resourceQuery: /file-loader/,
        loader: "file-loader"
      },
      {
        loader: "svg-inline-loader"
      }
    ]
  },
  {
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: "file-loader"
      }
    ]
  },
  {
    test: /\.graphql$/,
    exclude: /node_modules/,
    loader: "graphql-tag/loader"
  }
]

const extensions = [".ts", ".tsx", ".js", ".mjs", ".png", ".svg"]

const alias = {
  shared: path.resolve(__dirname, "./shared/src"),
  sharedTests: path.resolve(__dirname, "./shared/tests")
}

const resolve = {extensions, alias}

const plugins = [
  new CopyPlugin({
    patterns: [
      {from: "../shared/src/assets/dhx-spreadsheet/spreadsheet.min.css", to: "spreadsheet.min.css"},
      {from: "../shared/src/assets/dhx-spreadsheet/spreadsheet.min.js", to: "spreadsheet.min.js"},
      {from: "../shared/src/assets/dhx-spreadsheet/fonts", to: "fonts"}
    ],
    options: {
      concurrency: 100
    }
  }),
  new HtmlPlugin({
    title: "Luca",
    favicon: "../shared/src/assets/images/favicon.png",
    minify: {
      collapseWhitespace: true
    }
  }),
  new HtmlWebpackTagsPlugin({
    tags: ["spreadsheet.min.css", "spreadsheet.min.js"],
    append: true
  })
]

const productionPlugins = [
  new CompressionPlugin({
    filename: "[path].br[query]",
    test: /\.(js|css|svg|woff2)$/i,
    algorithm: "brotliCompress",
    compressionOptions: {
      level: 11,
      threshold: 10240,
      minRatio: 0.8
    }
  })
]

module.exports = {output, rules, resolve, plugins, productionPlugins}
