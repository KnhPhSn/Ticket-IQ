import { useState } from 'react';
import Card from '@mui/material/Card';
import {
  Button,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import type { UserDb } from 'src/types/users';
import useUpdateUser from '../hooks/useUpdateUser';

interface UserCardProps {
  user: UserDb;
  setUsers: React.Dispatch<React.SetStateAction<UserDb[]>>;
  editMode: boolean;
  setEditUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  editMode,
  setEditUser,
  setUsers,
}) => {
  const [editRole, setEditRole] = useState('');
  const [editSkills, setEditSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const { updateUser, loading, error } = useUpdateUser();
  const isOnline = user.isOnline ?? false;

  const handleEditClick = (user: UserDb) => {
    setEditUser(user.email);
    setEditRole(user.role);
    setEditSkills(user.skills || []);
  };

  const handleCancelEdit = () => {
    setEditUser(null);
    setEditRole('');
    setEditSkills([]);
    setNewSkill('');
  };

  const handleSave = async () => {
    const updatedUser = await updateUser(user.email, editRole, editSkills);
    if (updatedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.email === user.email ? updatedUser : u))
      );
      handleCancelEdit();
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editSkills.includes(newSkill.trim())) {
      setEditSkills([...editSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditSkills(editSkills.filter((skill) => skill !== skillToRemove));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const renderUserHeader = () => (
    <>
      <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
        <Typography variant="body1" className="font-semibold">
          Email:
        </Typography>
        <Chip label={user.email} size="small" color="info" />
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body1" className="font-semibold">
          Status:
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          gap={0.5}
          sx={{
            backgroundColor: isOnline ? '#e8f5e8' : '#fce4ec',
            border: isOnline ? '1px solid #4caf50' : '1px solid #e91e63',
            borderRadius: '12px',
            padding: '2px 8px',
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              backgroundColor: isOnline ? '#4caf50' : '#e91e63',
              borderRadius: '50%',
            }}
          />
          <Typography
            variant="caption"
            color={isOnline ? '#2e7d32' : '#ad1457'}
          >
            {isOnline ? 'Online' : 'Offline'}
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 20px 0 rgba(102, 126, 234, 0.1)',
          borderColor: '#cbd5e1',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: editMode ? 3 : 2.5,
          }}
        >
          {renderUserHeader()}
          {editMode ? (
            <>
              <FormControl fullWidth size="small">
                <InputLabel>Role</InputLabel>
                <Select
                  value={editRole}
                  label="Role"
                  onChange={(e) => setEditRole(e.target.value)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="moderator">Moderator</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>

              <div>
                <Typography variant="body1" className="font-semibold mb-2">
                  Skills:
                </Typography>

                {/* Display current skills as removable chips */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {editSkills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      variant="outlined"
                      onDelete={() => handleRemoveSkill(skill)}
                    />
                  ))}
                </div>

                {/* Add new skill input */}
                <div className="flex gap-2">
                  <TextField
                    size="small"
                    label="Add new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="e.g. JavaScript"
                    className="flex-1"
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleAddSkill}
                    disabled={!newSkill.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
              {error && (
                <Typography variant="body2" color="error" className="mb-2">
                  {error}
                </Typography>
              )}
              <div className="flex gap-2">
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSave}
                  loading={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                <Typography variant="body1" className="font-semibold">
                  Current Role:
                </Typography>
                <Chip
                  label={user.role}
                  size="small"
                  color="secondary"
                  variant="outlined"
                  className="capitalize"
                />
              </Box>

              <div>
                <Typography variant="body1" className="font-semibold mb-2">
                  Skills:
                </Typography>
                {user.skills && user.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {user.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </div>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No skills listed
                  </Typography>
                )}
              </div>

              <Button
                variant="outlined"
                size="small"
                className="mt-3"
                onClick={() => handleEditClick(user)}
              >
                Edit
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
