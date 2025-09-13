import { useEffect, useState } from 'react';
import { Container, Typography, TextField } from '@mui/material';
import useGetUsers from '../../hooks/useGetUsers';
import UserCardSkeleton from './UserCardSkeleton';
import type { UserDb } from '../../types/users';
import UserCard from '../../components/UserCard';
import { useSocket } from '../../context/SocketContext';

const Admin = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState<UserDb[]>([]);
  const [editUser, setEditUser] = useState<string | null>(null);
  const { users, setUsers, loading, error } = useGetUsers();
  const { socket } = useSocket();
  const userLoaded = !loading && !error;
  
  // Filter users based on search input
  useEffect(() => {
    setDisplayedUsers(
      users.filter((user) =>
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
      )
    );
  }, [searchEmail, users]);

  // Handle socket events for user online/offline status
  useEffect(() => {
    if (!socket) return;

    socket.on('user-online', (userId: string) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isOnline: true } : user
        )
      );
    });

    socket.on('user-offline', (userId: string) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isOnline: false } : user
        )
      );
    });

    return () => {
      socket.off('user-online');
      socket.off('user-offline');
    };
  }, [socket, setUsers]);

  return (
    <Container maxWidth="md" className="py-8">
      <Typography variant="h4" component="h1" className="mb-6 font-bold">
        Admin Panel - Manage Users
      </Typography>

      <TextField
        fullWidth
        placeholder="Search by email"
        variant="outlined"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        className="mb-6"
      />

      {loading &&
        Array.from({ length: 3 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}

      {error && (
        <Typography variant="body1" color="error" className="text-center py-8">
          {error}
        </Typography>
      )}

      {userLoaded && displayedUsers.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          className="text-center py-8"
        >
          No users found.
        </Typography>
      )}

      {userLoaded &&
        displayedUsers.length > 0 &&
        displayedUsers.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            setUsers={setUsers}
            editMode={editUser === user.email}
            setEditUser={setEditUser}
          />
        ))}
    </Container>
  );
};

export default Admin;
