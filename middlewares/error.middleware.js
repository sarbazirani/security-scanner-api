function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;

  const message =
    statusCode === 500
      ? "Internal server error\n"+err.message
      : err.message;

  return res.status(statusCode).json({
    error: message,
  });
}

module.exports = errorHandler;
