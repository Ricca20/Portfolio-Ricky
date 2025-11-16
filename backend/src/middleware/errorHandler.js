const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    err = {
      statusCode: 400,
      message
    };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err = {
      statusCode: 400,
      message: `${field} already exists`
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    err = {
      statusCode: 401,
      message: 'Invalid token'
    };
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;
