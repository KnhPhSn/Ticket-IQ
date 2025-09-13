import { useState } from 'react';
import api from '../api/axios';
import type { BackendError } from '../types/backend';
import type { AxiosResponse } from 'axios';
import type { UserDb } from '../types/users';

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (email: string, role: string, skills: string[]) => {
    setLoading(true);
    try {
      const { data }: AxiosResponse<{ user: UserDb }> = await api.patch(
        '/users/update',
        { email, role: role.toLowerCase(), skills }
      );
      return data.user;
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

  return { updateUser, loading, error };
};

export default useUpdateUser;
