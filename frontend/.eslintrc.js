module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    'prettier',
    'simple-import-sort',
    'only-warn',
    'react',
    'jest',
    "@emotion"
  ],
  settings: {
    react: {
      "version": "detect",
    }
  },
  rules: {
    // core
    'no-unused-vars': 0,
    'no-undef': 0,
    'consistent-return': [1, { "treatUndefinedAsUnspecified": true }],
    'quotes': [1, 'double', { "allowTemplateLiterals": true, "avoidEscape": true }],
    'semi': [1, 'never'],
    'max-lines': [1, { "max": 300 }],
    'max-params': [1, { "max": 7 }],
    'no-unneeded-ternary': [1],
    // import
    'import/newline-after-import': 1,
    'import/no-duplicates': 1,
    'import/max-dependencies': [1, { "max": 30 }],
    // sort-imports
    'simple-import-sort/imports': [1, {groups: [["^\\u0000", "^@?\\w", "^[^.]", "^\\."]]}],
    // sort-exports
    'simple-import-sort/exports': [1],
    'prettier/prettier': [1, { "endOfLine": 'auto' }],
    'sort-imports': 'off',
    'import/order': 'off',
    // react
    'react/prop-types': 0,
    "react/jsx-key": 0,
    "react/display-name": 0,
    // tslint
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    '@typescript-eslint/member-delimiter-style': [1,
      { "multiline": {
          "delimiter": "none",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        }}],
    // jest
    "jest/no-mocks-import": 0,
    //emotion
    "@emotion/pkg-renaming": "error"
  },
  overrides: [
    {
      files: ['*.test.*', '**/__tests__/**/*', '**/__mock__/**/*'],
      rules: {
        'consistent-return': 0,
        'max-lines': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-empty-function': 0,
        'import/max-dependencies': 0,
        'jest/no-mocks-import': 0,
      },
    },
  ],
};