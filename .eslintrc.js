const path = require('path');
module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'airbnb-base',
    'prettier',
    'plugin:flowtype/recommended',
  ],
  'plugins': [
    'prettier',
    'flowtype',
  ],
  'rules': {
    'prettier/prettier': ['error', {
      'singleQuote': true,
    }],
  },
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': path.join(__dirname, 'config/webpack.config.dev.js')
      }
    }
  }
};
