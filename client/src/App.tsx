import useAuth from './hooks/useAuth';
import AppRoutes from './AppRoutes';
import { useEffect } from 'react';
import { useSocket } from './context/SocketContext';
import { ToastContainer } from 'react-toastify';
import useTicketProgressToast from './hooks/useTicketProgressToast.tsx';

function App() {
  const { loadUser } = useAuth();
  const { socket } = useSocket();
  const ticketProgress = useTicketProgressToast();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('analyzing-ticket', () => {
      console.log('Received analyzing-ticket event');
      ticketProgress.showAnalyzing();
    });

    socket.on('assigning-moderator', () => {
      console.log('Received assigning-moderator event');
      ticketProgress.showAssigning();
    });

    socket.on('ticket-assigned', (ticketId: string) => {
      console.log('Received ticket-assigned event');
      ticketProgress.showAssigned(ticketId);
    });

    socket.on('ticket-assigned-to-you', (ticketId: string) => {
      console.log('Received ticket-assigned-to-you event');
      ticketProgress.showAssignedToYou(ticketId);
    });

    return () => {
      socket.off('connect');
      socket.off('analyzing-ticket');
      socket.off('assigning-moderator');
      socket.off('ticket-assigned');
      socket.off('ticket-assigned-to-you');
    };
  }, [socket, ticketProgress]);

  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
}

export default App;
