import { useRef, useCallback } from 'react';
import { Link } from 'react-router';
import { toast, type Id, Bounce } from 'react-toastify';

const useTicketProgressToast = () => {
  const toastIdRef = useRef<Id | null>(null);

  const showAnalyzing = useCallback(() => {
    toastIdRef.current = toast.loading('AI is analyzing your ticket...', {
      position: 'bottom-left',
      closeOnClick: false,
      draggable: true,
      theme: 'light',
      transition: Bounce,
    });
  }, []);

  const showAssigning = useCallback(() => {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        render: 'Assigning a moderator to your ticket...',
        type: 'info',
        isLoading: true,
        position: 'bottom-left',
        closeOnClick: false,
        draggable: true,
        theme: 'light',
      });
    } else {
      toastIdRef.current = toast.loading(
        'Assigning a moderator to your ticket...',
        {
          position: 'bottom-left',
          closeOnClick: false,
          draggable: true,
          theme: 'light',
          transition: Bounce,
        }
      );
    }
  }, []);

  const showAssigned = useCallback((ticketId: string) => {
    const ticketMessage = (
      <div>
        Your ticket has been assigned.{' '}
        <Link
          to={`/tickets/${ticketId}`}
          style={{
            textDecoration: 'underline',
            color: '#007bff',
            fontWeight: 500,
          }}
        >
          View
        </Link>
      </div>
    );
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        render: ticketMessage,
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        position: 'bottom-left',
        pauseOnHover: false,
        closeOnClick: false,
        draggable: true,
        theme: 'light',
      });
    } else {
      toast.success(ticketMessage, {
        position: 'bottom-left',
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: 'light',
        transition: Bounce,
      });
    }
    toastIdRef.current = null; // Reset the toast ID after completion
  }, []);

  const showAssignedToYou = useCallback((ticketId: string) => {
    const ticketMessage = (
      <div>
        A ticket has been assigned to you.{' '}
        <Link
          to={`/tickets/${ticketId}`}
          style={{
            textDecoration: 'underline',
            color: '#007bff',
            fontWeight: 500,
          }}
        >View</Link>
      </div>
    );
    toast.success(ticketMessage, {
      position: 'bottom-left',
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: 'light',
      transition: Bounce,
    });
    toastIdRef.current = null; // Reset the toast ID after completion
  }, []);

  const cancel = useCallback(() => {
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  }, []);

  return {
    showAnalyzing,
    showAssigning,
    showAssigned,
    showAssignedToYou,
    cancel,
  };
};

export default useTicketProgressToast;
