import { useEffect, useState } from 'react';
import type { UserDb } from '../types/users';
import api from '../api/axios';
import type { BackendError } from '../types/backend';
import { type AxiosResponse } from 'axios';

const useGetUsers = () => {
  const [users, setUsers] = useState<UserDb[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const { data }: AxiosResponse<{ users: UserDb[]; count: number }> =
          await api.get('/users');
        const { data: dataOnlineUsers } = await api.get<{ onlineUsers: string[] }>(
          '/users/online'
        );
        const dataOnlineUsersSet = new Set(dataOnlineUsers.onlineUsers);
        setUsers(data.users.map(user => ({
          ...user,
          isOnline: dataOnlineUsersSet.has(user._id),
        })));
        setError(null);
      } catch (error) {
        const axiosError = error as BackendError;
        console.error(
          axiosError?.response?.data.message ||
            axiosError.message ||
            'Failed to fetch users'
        );
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users, setUsers, loading, error };
};

export default useGetUsers;
