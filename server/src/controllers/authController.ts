import { Request, Response } from 'express';
import CustomAPIError from '../errors/CustomAPIError';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import type { SignupRequest, LoginRequest } from '../types/auth';
import { type UserPayload } from '../types/express';
import { inngest } from '../inngest/client';
import { sendAuthToken } from '../utils/sendAuthToken';
import RefreshToken from '../models/RefreshToken';
import jwt from 'jsonwebtoken';

export const signup = async (
  req: Request<{}, {}, SignupRequest>,
  res: Response
) => {
  // add the new user to the db
  const { name, email, password, skills = [] } = req.body || {};
  const user = await User.create({ name, email, password, skills });

  // send signup email
  try {
    await inngest.send({
      name: 'user/signup',
      data: { email, name },
    });
  } catch (error) {
    console.error('Error sending Signup email event:', error);
  }
  // create jwt tokens
  await sendAuthToken(user, true, res, StatusCodes.CREATED);
};

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response
) => {
  const { email, password, rememberMe = false } = req.body || {};
  if (!email || !password) {
    throw new CustomAPIError(
      'Bad Request. Please provide email and password',
      StatusCodes.BAD_REQUEST
    );
  }
  // find a user && compare password
  const user = await User.findOne({ email });
  const isValidCredentials = user && (await user.comparePassword(password));
  if (!isValidCredentials) {
    throw new CustomAPIError('Invalid Credentials', StatusCodes.UNAUTHORIZED);
  }
  // create jwt tokens
  await sendAuthToken(user, rememberMe, res, StatusCodes.OK);
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken, tokenId } = req.cookies?.jwt || {};
  if (!refreshToken) {
    res.sendStatus(StatusCodes.NO_CONTENT);
    return;
  }
  await RefreshToken.deleteOne({ tokenId });
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  res.sendStatus(StatusCodes.NO_CONTENT);
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies?.jwt || {};
  if (!refreshToken)
    throw new CustomAPIError(
      'No refresh token sent in the request',
      StatusCodes.UNAUTHORIZED
    );
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as UserPayload;
    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
        name: decoded.name,
        role: decoded.role,
        email: decoded.email,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '15m' }
    );
    res.json({ accessToken, user: { name: decoded.name, role: decoded.role, email: decoded.email } });
  } catch (err) {
    throw new CustomAPIError('Invalid or expired token', StatusCodes.FORBIDDEN);
  }
};
