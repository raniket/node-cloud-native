/*eslint require-atomic-updates: off */

const jwt = require("jsonwebtoken");
const { BadRequestResponse, InvalidTokenResponse } = require("../responses");
const errorCodes = require("../../settings/error-codes");
const OAuthPublicKeysModel = require("../models/db/oauth-public-keys");
const UserModel = require("../models/db/user");

/**
 * Authorize every incomming request.
 *
 * @param {Ojbect} req The request object.
 * @param {Ojbect} res The response object.
 * @param {Function} next The next function
 * @async
 */
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new BadRequestResponse("Authorization header is required", errorCodes.INVALID_HEADER);
    }
    const token = req.headers.authorization.split(" ")[1];
    let userDecodedContent = jwt.decode(token);
    if (userDecodedContent === null) throw new InvalidTokenResponse("Invalid token");
    const oAuthKeys = await OAuthPublicKeysModel.findByClientId(userDecodedContent.aud || null);
    if (!oAuthKeys.length) throw new InvalidTokenResponse("Invalid token");
    const publicKey = oAuthKeys[0].public_key;
    await jwt.verify(token, publicKey);
    const userData = await UserModel.findById(userDecodedContent.sub || null);
    if (!userData.length) throw new BadRequestResponse("User not found");
    req.user = userData[0];
    next();
  } catch (e) {
    if (e.name === "JsonWebTokenError" && (e.message === "invalid token" || e.message === "jwt must be provided" || e.message === "invalid signature")) {
      return next(new InvalidTokenResponse(e.message));
    }
    if (e.name === "TokenExpiredError") return next(new InvalidTokenResponse(e.message));
    next(e);
  }
};
