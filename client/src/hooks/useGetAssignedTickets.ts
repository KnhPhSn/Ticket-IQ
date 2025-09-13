import { useState, useCallback } from 'react';
import api from '../api/axios';
import type { Ticket } from '../types/tickets';
import type { BackendError } from '../types/backend';
import type { AxiosResponse } from 'axios';

const useGetAssignedTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignedTickets = useCallback(async () => {
      setLoading(true);
      try {
        const { data }: AxiosResponse<Ticket[]> = await api.get('/tickets/assigned');
        setTickets(data);
      } catch (err) {
        const axiosError = err as BackendError;
        console.error(
          axiosError?.response?.data.message ||
            axiosError.message ||
            'Unknown error'
        );
        setError('Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    }, []);


  return { fetchAssignedTickets, tickets, loading, error };
};

export default useGetAssignedTickets;
