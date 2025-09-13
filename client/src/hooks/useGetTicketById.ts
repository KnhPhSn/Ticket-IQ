import { useEffect, useState } from 'react';
import type { Ticket } from '../types/tickets';
import api from '../api/axios';
import type { BackendError } from '../types/backend';
import type { AxiosResponse } from 'axios';

const useGetTicketById = (id: string) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketById = async () => {
      setLoading(true);
      try {
        const { data }: AxiosResponse<{ ticket: Ticket }> = await api.get(
          `/tickets/${id}`
        );
        setTicket(data.ticket);
      } catch (error) {
        const axiosError = error as BackendError;
        const errMsg =
          axiosError?.response?.data.message ||
          axiosError.message ||
          'Failed to fetch ticket';
        console.error(errMsg);
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchTicketById();
  }, [id]);

  return { ticket, loading, error };
};

export default useGetTicketById;
