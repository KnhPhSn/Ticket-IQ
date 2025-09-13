import { Request, Response } from 'express';
import { UpdateUser } from '../types/users';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/CustomAPIError';
import User from '../models/User';
import { onlineUsers } from '../sockets/socket';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({ role: { $ne: 'admin' } }).select('-password'); // Exclude password from the response
  res.json({ users, count: users.length });
};

export const getOnlineUsers = async (req: Request, res: Response) => {
  res.json({ onlineUsers: Array.from(onlineUsers) });
};

export const updateUser = async (
  req: Request<{}, {}, UpdateUser>,
  res: Response
) => {
  const { email, role, skills } = req.body || {};
  if (!email)
    throw new CustomAPIError(
      'Please send an email for the update request',
      StatusCodes.BAD_REQUEST
    );
  const updatedFields = Object.fromEntries(
    Object.entries({ role, skills }).filter(([_, value]) => value !== undefined)
  );
  const user = await User.findOneAndUpdate({ email }, updatedFields, {
    new: true,
    runValidators: true,
  });
  if (!user)
    throw new CustomAPIError(
      `No user with email ${email}`,
      StatusCodes.NOT_FOUND
    );
  res.json({ user });
};
