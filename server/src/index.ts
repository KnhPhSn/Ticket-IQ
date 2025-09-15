import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import corsOptions, { allowedOrigins } from './config/corsOptions';
import cookieParser from 'cookie-parser';
import rateLimiter from './middleware/rateLimiter';
import notFoundHandler from './middleware/notFound';
import connectDB from './config/database';
import errorHandler from './middleware/errorHandler';
import authRouter from './routes/auth';
import authenticateUser from './middleware/authenticateUser';
import usersRouter from './routes/users';
import ticketsRouter from './routes/tickets';
import { inngestHandler } from './inngest/handler';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import authenticateSocket from './middleware/authenticateSocket';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketData,
} from '../../shared/socket';
import registerSocketEvents from './sockets/socket';
import setupSwagger from './config/swagger';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  {},
  SocketData
>(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// security middleware
app.use(rateLimiter);
app.use(helmet());
app.use(cors(corsOptions));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/inngest', inngestHandler);

// setup Swagger
setupSwagger(app);

// routes
app.use('/api/auth', authRouter);
app.use('/api/users', authenticateUser, usersRouter);
app.use('/api/tickets', authenticateUser, ticketsRouter);

// error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// socket.io connection
io.use(authenticateSocket);
registerSocketEvents();

// starting the server
const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('DB connection failed', err);
  }
};

start();
