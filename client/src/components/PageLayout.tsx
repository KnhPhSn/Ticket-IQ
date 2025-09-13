import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useLocation, useNavigate, Outlet } from 'react-router';
import {
  AdminPanelSettings,
  Home,
  Logout,
  Menu as MenuIcon,
  Person,
} from '@mui/icons-material';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const PageLayout = () => {
  const { user, logoutHandler } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, sm: 3, md: 6 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {/* Left side - Logo */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 },
              cursor: 'pointer',
              flexGrow: 1,
            }}
          >
            <Home
              sx={{
                color: 'white',
                fontSize: { xs: 20, sm: 24, md: 28 },
              }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'white',
                fontSize: { xs: '1.0rem', sm: '1.3rem', md: '1.5rem' },
              }}
            >
              Ticket IQ
            </Typography>
          </Box>

          {/* Right side - Navigation */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 2, md: 3 },
            }}
          >
            {isAuthPage ? (
              // Auth pages - show login/signup buttons
              <>
                {isMobile ? (
                  <>
                    <IconButton
                      onClick={handleMenuOpen}
                      sx={{ color: 'white' }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: {
                          background:
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          minWidth: 150,
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => handleNavigation('/login')}
                        sx={{
                          color:
                            location.pathname === '/login'
                              ? 'white'
                              : 'rgba(255, 255, 255, 0.8)',
                          fontWeight:
                            location.pathname === '/login' ? 600 : 400,
                        }}
                      >
                        Login
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleNavigation('/signup')}
                        sx={{
                          color:
                            location.pathname === '/signup'
                              ? 'white'
                              : 'rgba(255, 255, 255, 0.8)',
                          fontWeight:
                            location.pathname === '/signup' ? 600 : 400,
                        }}
                      >
                        Sign Up
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => navigate('/login')}
                      sx={{
                        color:
                          location.pathname === '/login'
                            ? 'white'
                            : 'rgba(255, 255, 255, 0.8)',
                        textTransform: 'none',
                        fontWeight: location.pathname === '/login' ? 600 : 400,
                        fontSize: { sm: '0.875rem', md: '1rem' },
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => navigate('/signup')}
                      variant={
                        location.pathname === '/signup'
                          ? 'contained'
                          : 'outlined'
                      }
                      sx={{
                        textTransform: 'none',
                        fontSize: { sm: '0.875rem', md: '1rem' },
                        backgroundColor:
                          location.pathname === '/signup'
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'transparent',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          borderColor: 'white',
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </>
            ) : user ? (
              // Authenticated user - show user info and logout
              <>
                {isMobile ? (
                  <>
                    <IconButton
                      onClick={handleMenuOpen}
                      sx={{ color: 'white' }}
                    >
                      <Person />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: {
                          background:
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          minWidth: 180,
                        },
                      }}
                    >
                      <MenuItem
                        disabled
                        sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        Hi, {user.name}!
                      </MenuItem>
                      {user.role === 'admin' && (
                        <MenuItem
                          onClick={() => handleNavigation('/admin')}
                          sx={{
                            color:
                              location.pathname === '/admin'
                                ? 'white'
                                : 'rgba(255, 255, 255, 0.8)',
                            fontWeight:
                              location.pathname === '/admin' ? 600 : 400,
                          }}
                        >
                          <AdminPanelSettings sx={{ mr: 1, fontSize: 20 }} />
                          Admin
                        </MenuItem>
                      )}
                      <MenuItem
                        onClick={() => {
                          logoutHandler();
                          handleMenuClose();
                        }}
                        sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        <Logout sx={{ mr: 1, fontSize: 20 }} />
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { sm: '12px', md: '14px' },
                        fontWeight: 500,
                        display: { xs: 'none', sm: 'block' },
                      }}
                    >
                      Hi, {user.name}!
                    </Typography>

                    {user.role === 'admin' && (
                      <Button
                        onClick={() => navigate('/admin')}
                        startIcon={<AdminPanelSettings />}
                        sx={{
                          textTransform: 'none',
                          fontSize: { sm: '0.875rem', md: '1rem' },
                          color:
                            location.pathname === '/admin'
                              ? 'white'
                              : 'rgba(255, 255, 255, 0.8)',
                          fontWeight:
                            location.pathname === '/admin' ? 600 : 400,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                          Admin
                        </Box>
                      </Button>
                    )}

                    <Button
                      onClick={logoutHandler}
                      startIcon={<Logout />}
                      variant="outlined"
                      sx={{
                        textTransform: 'none',
                        fontSize: { sm: '0.875rem', md: '1rem' },
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: 'white',
                        },
                      }}
                    >
                      <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        Logout
                      </Box>
                    </Button>
                  </>
                )}
              </>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
