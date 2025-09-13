import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

interface AuthBoxProps {
  mode: 'login' | 'signup';
}

const AuthBox = ({ mode }: AuthBoxProps) => {
  const { loginHandler, signupHandler, loading, error, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (mode === 'login') {
      await loginHandler({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });
    } else {
      await signupHandler({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Paper
        elevation={1}
        className="w-full max-w-md p-8"
        sx={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          {/* Title */}
          <Typography
            variant="h4"
            component="h1"
            className="text-center font-bold text-gray-900 mb-8"
          >
            {mode === 'login' ? 'Log in' : 'Sign Up'}
          </Typography>

          {/* Error Message */}
          {error && (
            <Typography
              variant="body2"
              className="text-center text-red-600 mb-4 px-4 py-2 bg-red-50 rounded border border-red-200"
            >
              {error}
            </Typography>
          )}

          {/* Form Fields */}
            {mode === 'signup' && (
              <TextField
                fullWidth
                autoComplete="username"
                label="Name"
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
                className="mb-4"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#d1d5db',
                    },
                    '&:hover fieldset': {
                      borderColor: '#9ca3af',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1f2937',
                    },
                  },
                }}
              />
            )}

            <TextField
              fullWidth
              autoComplete="email"
              label="Email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              className="mb-4"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1f2937',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange('password')}
              required
              className="mb-3"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                        sx={{
                          color: '#6b7280',
                          '&:hover': {
                            color: '#374151',
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1f2937',
                  },
                },
              }}
            />
          {mode === 'login' && (
            <Box mb={0.5}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.rememberMe || false}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        rememberMe: e.target.checked,
                      }))
                    }
                    
                  />
                }
                label="Remember me"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color: '#374151',
                    fontSize: '14px',
                  },
                }}
              />
            </Box>
          )}
          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            className="py-3"
            sx={{
              backgroundColor: '#1f2937',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#374151',
              },
              '&:disabled': {
                backgroundColor: '#9ca3af',
                color: '#ffffff',
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default AuthBox;
