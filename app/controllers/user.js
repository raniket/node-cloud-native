const joi = require('joi');
const { BadRequestResponse } = require('../responses');
const UserModel = require('../models/db/user');

const payloadSchema = joi.object().keys({
  username: joi
    .string()
    .email()
    .required(),
  first_name: joi.string().required(),
  middle_name: joi.string().optional(),
  last_name: joi.string().optional(),
  phone: joi
    .number()
    .integer()
    .min(10)
    .optional()
});

module.exports = async (req, res, next) => {
  try {
    const body = await joi.validate(req.body, payloadSchema);
    const user = await UserModel.create(body);
    res.send(user);
  } catch (error) {
    if (error.name === 'ValidationError' && error.isJoi === true) {
      return next(new BadRequestResponse(error.details[0].message, errorCodes.BAD_REQUEST));
    }
    console.log(error);
    next(error);
  }
};
