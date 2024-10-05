const { logs } = require("./logger");
const errorHandler = (err, req, res, next) => {
  logs(`${err.message}\t${err.stack}`, "errors.log");
  const status = res.statusCode ? res.statusCode : 500;

  res.status(status).json({ message: err.message });
};

module.exports = errorHandler;
