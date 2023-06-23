class customError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

function createCustomError(msg, statuscode) {
  return new customError(msg, statuscode);
}

module.exports = { customError, createCustomError };
