// {
//   "extends": ["airbnb-base"],
//   "plugins": ["prettier"],
//   "rules": {
//     "prettier/prettier": ["error"]
//   },
// }

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  globals: {
    _: true,
    httpStatus: true,
    errorCodes: true,
    logger: true,
    knex: true
  },

  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-console': 'off'
  }
};
