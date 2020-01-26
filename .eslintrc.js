module.exports = {
  extends: ['airbnb-base', 'prettier'],
  globals: {
    _: true,
    httpStatus: true,
    errorCodes: true,
    logger: true,
    knex: true
  },

  plugins: ['prettier', 'jest'],
  rules: {
    'prettier/prettier': ['error'],
    'no-console': 'off'
  }
};
