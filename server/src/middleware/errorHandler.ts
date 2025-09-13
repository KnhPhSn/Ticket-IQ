import { StatusCodes } from 'http-status-codes';
import { ErrorRequestHandler } from 'express';

interface ICustomError {
  statusCode: number;
  message: string;
}

const MONGOOSE_DUPLICATE_ERROR_CODE: number = 11000;

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Mongoose Error Handling
  let customError: ICustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, please try again later',
  };

  // Validation errors
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(', ');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Duplicate Key error
  if (err.code === MONGOOSE_DUPLICATE_ERROR_CODE) {
    customError.message = `${Object.keys(err.keyValue)[0]} already exists`;
    customError.statusCode = StatusCodes.CONFLICT;
  }

  // Casting error
  if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    customError.message = 'Invalid token';
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }

  if (err.name === 'TokenExpiredError') {
    customError.message = 'Token expired';
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }

  res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandler;
