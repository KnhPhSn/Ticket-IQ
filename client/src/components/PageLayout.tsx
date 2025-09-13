import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useLocation, useNavigate, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';

const PageLayout = () => {
  const { user, logoutHandler } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-white">
      <AppBar
        position="static"
        elevation={0}
        className="bg-white border-b border-gray-200"
        sx={{
          backgroundColor: 'white',
          boxShadow:
            '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        }}
      >
        <Toolbar className="px-6">
          {/* Left side - Logo */}
          <Typography
            variant="h6"
            component="div"
            className="flex-grow font-bold text-gray-900 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Ticket IQ
          </Typography>

          {/* Right side - Navigation */}
          <Box className="flex items-center gap-3">
            {isAuthPage ? (
              // Auth pages - show login/signup buttons
              <>
                <Button
                  onClick={() => navigate('/login')}
                  className="text-gray-600 hover:text-gray-900"
                  sx={{
                    color:
                      location.pathname === '/login' ? '#1f2937' : '#6b7280',
                    textTransform: 'none',
                    fontWeight: location.pathname === '/login' ? 600 : 400,
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  variant={
                    location.pathname === '/signup' ? 'contained' : 'outlined'
                  }
                  className="ml-2"
                  sx={{
                    textTransform: 'none',
                    backgroundColor:
                      location.pathname === '/signup'
                        ? '#1f2937'
                        : 'transparent',
                    borderColor: '#1f2937',
                    color:
                      location.pathname === '/signup' ? 'white' : '#1f2937',
                    '&:hover': {
                      backgroundColor:
                        location.pathname === '/signup' ? '#374151' : '#f9fafb',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : user ? (
              // Authenticated user - show user info and logout
              <>
                <Typography className="text-gray-700 text-sm">
                  Hi, {user.name}!
                </Typography>

                {user.role === 'admin' && (
                  <Button
                    onClick={() => navigate('/admin')}
                    className="text-gray-600 hover:text-gray-900"
                    sx={{
                      textTransform: 'none',
                      color:
                        location.pathname === '/admin' ? '#1f2937' : '#6b7280',
                      fontWeight: location.pathname === '/admin' ? 600 : 400,
                    }}
                  >
                    Admin
                  </Button>
                )}

                <Button
                  onClick={logoutHandler}
                  variant="outlined"
                  className="ml-2"
                  sx={{
                    textTransform: 'none',
                    borderColor: '#d1d5db',
                    color: '#6b7280',
                    '&:hover': {
                      backgroundColor: '#f9fafb',
                      borderColor: '#9ca3af',
                    },
                  }}
                >
                  Logout
                </Button>
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
