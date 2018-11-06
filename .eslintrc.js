module.exports = {
  'env': {
    'browser': true,
    'node': true,
  },
  'extends': [
    'airbnb-base',
    'prettier',
  ],
  'plugins': [
    'prettier',
  ],
  'rules': {
    'prettier/prettier': ['error', {
      'singleQuote': true,
    }],
  },
};
