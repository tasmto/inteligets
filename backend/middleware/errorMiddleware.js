// Custom response error handlers

const notFound = (req, res, next) => {
  const error = new Error(`Not Found (${req.originalUrl})`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // This will change a potential false 200 error message to 500 because 200 can still be an error.
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'prod' ? null : err.stack,
    // Show stacktrace error only when in production mode, else dont.
  });
};

export { notFound, errorHandler };
