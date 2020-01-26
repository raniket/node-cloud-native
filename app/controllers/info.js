const { APP  } = require("../../settings/custom");
const { version } = require("../../package.json");
/**
 * App information
 *
 * @param {Ojbect} req The request object.
 * @param {Ojbect} res The response object.
 * @param {Function} next The next function
 * @returns {Object} App information.
 * @async
 */
module.exports = async (req, res, next) => {
  try {
    const response = {
      name: APP.NAME,
      version: {
        number: version,
        build_hash: APP.BUILD_HASH,
        build_date: APP.BUILD_DATE
      },
      tagline: APP.TAGLINE
    };
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};
