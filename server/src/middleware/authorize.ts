import { RequestHandler } from 'express';
import CustomAPIError from '../errors/CustomAPIError';
import { StatusCodes } from 'http-status-codes';

const authorize = (allowedRoles: string[]): RequestHandler => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole)
      throw new CustomAPIError(
        'User is not authorized',
        StatusCodes.UNAUTHORIZED
      );
    const isAuthorized = allowedRoles.includes(userRole);
    if (!isAuthorized)
      throw new CustomAPIError(
        'User is not authorized for that request',
        StatusCodes.FORBIDDEN
      );
    next();
  };
};

export default authorize;
