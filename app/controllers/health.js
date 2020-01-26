module.exports = async (req, res, next) => {
  try {
    res.status(httpStatus.OK).json({ status: "Ok" }).end();
  } catch (error) {
    next(error);
  }
};
