import CustomAPIError from '../errors/CustomAPIError';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import { type UserPayload } from '../types/express';
import { ExtendedError, Socket } from 'socket.io';
import { verifyToken } from '../utils/verifyToken';

const authenticateSocket = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  const token: string | null = socket.handshake.auth.token;
  if (!token) {
    return next(
      new CustomAPIError('Access token required', StatusCodes.UNAUTHORIZED)
    );
  }

  try {
    const decoded = verifyToken(token);
    socket.data = { ...decoded };
    next();
  } catch (err) {
    return next(err as ExtendedError);
  }
};

export default authenticateSocket;
