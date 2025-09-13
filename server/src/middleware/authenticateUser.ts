import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/CustomAPIError';
import { type UserPayload } from '../types/express';
import { verifyToken } from '../utils/verifyToken';

const authenticateUser: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : ''; // Bearer {token}
  if (!token) {
    throw new CustomAPIError('Access token required', StatusCodes.UNAUTHORIZED);
  }

  try {
    const decoded = verifyToken(token);
    req.user = { ...decoded };
    next();
  } catch (err) {
    throw err; // Re-throw the CustomAPIError from verifyToken
  }
};

export default authenticateUser;
