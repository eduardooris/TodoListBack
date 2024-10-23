const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message || "An error occurred",
  });
};

module.exports = errorHandler;
