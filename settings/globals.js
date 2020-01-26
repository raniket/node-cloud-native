module.exports = async () => {
  global["_"] = require("lodash");
  global.knex = require("./datastore");
  global.httpStatus = require("http-status");
  global.errorCodes = require("./error-codes");
};
