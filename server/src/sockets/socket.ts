import { io } from '../index';

// Set to track online users (non-admin users)
export const onlineUsers = new Set<string>();

const registerSocketEvents = () => {
  io.on('connection', (socket) => {
    console.log('New client connected: ', socket.id);
    socket.join(socket.data.userId);
    console.log('Joining Room: ', socket.data.userId);

    if (socket.data.role === 'admin') {
      socket.join('admins');
    }

    if (socket.data.role !== 'admin') {
      // Add user to online users set
      onlineUsers.add(socket.data.userId);
      socket.to('admins').emit('user-online', socket.data.userId);
      console.log('Online Users: ', onlineUsers);
    }

    socket.on('disconnect', () => {
      if (socket.data.role !== 'admin') {
        // Remove user from online users set
        onlineUsers.delete(socket.data.userId);
        socket.to('admins').emit('user-offline', socket.data.userId);
      }
    });
  });
};

export default registerSocketEvents;
