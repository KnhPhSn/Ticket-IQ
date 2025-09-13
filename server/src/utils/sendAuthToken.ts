import { Response } from 'express';
import { type UserType } from '../models/User';
import RefreshToken from '../models/RefreshToken';
import { REFRESH_TOKEN_EXPIRY_MS, REFRESH_TOKEN_EXPIRY_MS_LONG } from '../config/constants';
import { getRefreshTokenExpiryDate } from '../utils/getRefreshTokenExpiryDate';
import { Document } from 'mongoose';
import { randomUUID } from 'crypto';

export const sendAuthToken = async (
  user: UserType & Document,
  rememberMe: boolean,
  res: Response,
  statusCode: number
) => {
  // create jwt tokens
  const { accessToken, refreshToken } = user.createTokens();
  const tokenId = randomUUID();
  await RefreshToken.create({
    token: refreshToken,
    userId: user._id,
    tokenId,
    expiresAt: getRefreshTokenExpiryDate(),
  });

  res.cookie(
    'jwt',
    { tokenId, refreshToken },
    {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: rememberMe ? REFRESH_TOKEN_EXPIRY_MS_LONG : REFRESH_TOKEN_EXPIRY_MS,
    }
  ); // in the frontend, you need to set 'credentials: true' so the cookie becomes visible to the server

  res.status(statusCode).json({
    user: { name: user.name, email: user.email, role: user.role },
    accessToken,
  });
};
