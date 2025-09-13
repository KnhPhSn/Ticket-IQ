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
import {
  Visibility,
  VisibilityOff,
  PersonAddOutlined,
  LoginOutlined,
} from '@mui/icons-material';
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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, #e0e7ff 0%, #e0f2fe 50%, #f3e8ff 100%)',
        py: { xs: 6, sm: 12 },
        px: { xs: 2, sm: 4, lg: 8 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: 400, md: 480 },
          p: { xs: 3, sm: 4, md: 6 },
          borderRadius: { xs: '12px', sm: '16px' },
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid rgba(99, 102, 241, 0.1)',
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          {/* Title */}
          <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 8 } }}>
            <Box
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              {mode === 'login' ? (
                <LoginOutlined
                  sx={{ color: 'white', fontSize: { xs: 24, sm: 28 } }}
                />
              ) : (
                <PersonAddOutlined
                  sx={{ color: 'white', fontSize: { xs: 24, sm: 28 } }}
                />
              )}
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
                mb: 1,
              }}
            >
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#64748b', fontSize: '14px' }}
            >
              {mode === 'login'
                ? 'Sign in to your account to continue'
                : 'Join us today and start managing tickets'}
            </Typography>
          </Box>

          {/* Error Message */}
          {error && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                border: '1px solid #fca5a5',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#dc2626',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                {error}
              </Typography>
            </Box>
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
              sx={{
                mb: 3,
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
                '& .MuiInputLabel-root': {
                  color: '#64748b',
                  '&.Mui-focused': {
                    color: '#667eea',
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
            sx={{
              mb: 3,
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
              '& .MuiInputLabel-root': {
                color: '#64748b',
                '&.Mui-focused': {
                  color: '#667eea',
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
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                      sx={{
                        color: '#64748b',
                        '&:hover': {
                          color: '#667eea',
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
              mb: 3,
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
              '& .MuiInputLabel-root': {
                color: '#64748b',
                '&.Mui-focused': {
                  color: '#667eea',
                },
              },
            }}
          />
          {mode === 'login' && (
            <Box mb={2}>
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
                    sx={{
                      color: '#64748b',
                      '&.Mui-checked': {
                        color: '#667eea',
                      },
                    }}
                  />
                }
                label="Remember me"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: 500,
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
            sx={{
              py: 1.5,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 4px 15px 0 rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                boxShadow: '0 6px 20px 0 rgba(102, 126, 234, 0.4)',
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                background: '#cbd5e1',
                color: '#64748b',
                boxShadow: 'none',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthBox;
