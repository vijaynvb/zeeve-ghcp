// A tiny centralized error handler keeps responses consistent.
const errorHandler = (err, req, res, next) => {
  console.error('API error', err);
  const status = err.status || 500;
  res.status(status).json({
    code: err.code || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'Something went wrong'
  });
};

module.exports = errorHandler;
