import { useEffect, useState } from 'react';
import { Container, Typography, TextField, Box, Paper } from '@mui/material';
import { AdminPanelSettings, Search } from '@mui/icons-material';
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
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          mb: { xs: 3, sm: 4 },
          borderRadius: { xs: '16px', sm: '20px' },
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid #e2e8f0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.5, sm: 2 },
            mb: { xs: 3, sm: 4 },
          }}
        >
          <Box
            sx={{
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AdminPanelSettings
              sx={{ color: 'white', fontSize: { xs: 20, sm: 24 } }}
            />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
            }}
          >
            Admin Panel
          </Typography>
        </Box>

        <TextField
          fullWidth
          placeholder="Search users by email..."
          variant="outlined"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: '#94a3b8', mr: 1 }} />,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: '#e2e8f0',
              },
              '&:hover fieldset': {
                borderColor: '#667eea',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#667eea',
                borderWidth: '2px',
              },
            },
          }}
        />
      </Paper>

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
