const { customError } = require("../errors/custom-error");

const error_handler = (err, req, res, next) => {
  if (err instanceof customError) {
    return res.status(err.statuscode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: err });
};

module.exports = error_handler;
