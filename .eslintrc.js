module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,
    'comma-dangle': [2, 'never'],
    'space-before-function-paren': ['error', 'never'],
    'no-extra-semi': 'error',
    'quotes': [2, 'single', {
      'avoidEscape': true
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
