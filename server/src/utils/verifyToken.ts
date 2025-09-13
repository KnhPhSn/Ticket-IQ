import jwt from 'jsonwebtoken';
import CustomAPIError from '../errors/CustomAPIError';
import { StatusCodes } from 'http-status-codes';
import { type UserPayload } from '../types/express';

export const verifyToken = (token: string): UserPayload => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as UserPayload;
    return decoded;
  } catch (err) {
    throw new CustomAPIError(
      'Invalid or expired token',
      StatusCodes.UNAUTHORIZED
    );
  }
};
