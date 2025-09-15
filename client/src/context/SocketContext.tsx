/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import io, { type Socket } from 'socket.io-client';
import { type RootState } from '../store/store';
import { useSelector } from 'react-redux';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from '@shared/socket';

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

interface SocketContextType {
  socket: SocketType | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

type SocketProviderProps = {
  children: ReactNode;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<SocketType | null>(null);
  const token = useSelector((store: RootState) => store.auth.token);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', { auth: { token } });
    newSocket.on('connect_error', (error) => {
      console.log('Connection error:', error.message);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected:', reason);
    });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [token]);

  return <SocketContext value={{ socket }}>{children}</SocketContext>;
};
