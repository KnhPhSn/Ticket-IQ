import { useState } from 'react';
import type { BackendError } from '../types/backend';
import api from '../api/axios';
import type { AxiosResponse } from 'axios';
import type { CreateTicketResponse } from '../types/tickets';

const useCreateTicket = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTicket = async (title: string, description: string) => {
    setLoading(true);
    try {
      const { data }: AxiosResponse<CreateTicketResponse> = await api.post(
        '/tickets',
        { title, description }
      );
      return data.ticket;
    } catch (err) {
      const axiosError = err as BackendError;
      const errMsg =
        axiosError?.response?.data.message ||
        axiosError.message ||
        'Failed to create ticket';
      console.error(errMsg);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createTicket };
};

export default useCreateTicket;
