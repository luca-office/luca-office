const esModules = [
  // Copy from here 👈
  "react-markdown",
  "vfile",
  "unist-.+",
  "unified",
  "bail",
  "is-plain-obj",
  "trough",
  "remark-.+",
  "micromark-.+",
  "mdast-util-.+",
  "micromark",
  "parse-entities",
  "character-entities",
  "property-information",
  "comma-separated-tokens",
  "hast-util-whitespace",
  "remark-.+",
  "space-separated-tokens",
  "decode-named-character-reference",
  "ccount",
  "escape-string-regexp",
  "markdown-table",
  "trim-lines",
  "lodash-es",
  "uuid",
  "@react-hook/event",
  "remark-gfm"
].join("|")

module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  modulePaths: ["src"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleNameMapper: {
    "\\.(svg(\\?file-loader)*|jpg|png|less|css)$": "<rootDir>/tests/utils/empty-module.tsx",
    "\\.worker.js": "<rootDir>/tests/utils/worker-mock.js",
    "^react-dom((\\/.*)?)$": "react-dom-17$1",
    "^react((\\/.*)?)$": "react-17$1"
  },
  testRegex: "/*/.*(test|spec)\\.(ts|tsx)$",
  transform: {
    "\\.(ts|tsx)$": ["ts-jest", {isolatedModules: true}],
    "\\.(gql|graphql)$": "@graphql-tools/jest-transform",
    ".*": "babel-jest"
  },
  transformIgnorePatterns: [`/node_modules/(?!(${esModules})/.*)`],
  setupFilesAfterEnv: ["<rootDir>/tests/config.js"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{tsx,ts}", "!**/node_modules/**", "!**/*-options.{js,tsx,ts}", "!**/*d.ts"],
  testEnvironmentOptions: {
    url: "http://localhost"
  },
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "jsdom"
}
