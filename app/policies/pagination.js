/*eslint require-atomic-updates: off */

const { PAGINATION } = require("../../settings/custom");
/**
 * Add pagination information to the request object.
 *
 * @param {Ojbect} req The request object.
 * @param {Ojbect} res The response object.
 * @param {Function} next The next function
 * @async
 */
module.exports = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || PAGINATION.DEFAULT_PAGE;
    const pageSize = parseInt(req.query.pageSize, 10) || PAGINATION.DEFAULT_PAGE_SIZE;
    const offset = (page - 1) * pageSize;
    req.pagination = { limit: pageSize, offset, page, pageSize };
    next();
  } catch (e) {
    next(e);
  }
};
