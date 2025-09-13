import { Box, CircularProgress, Typography } from '@mui/material';
import { ConfirmationNumber } from '@mui/icons-material';

const PageLoading = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Logo Animation */}
      <Box
        sx={{
          position: 'relative',
          mb: 4,
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
              opacity: 1,
            },
            '50%': {
              transform: 'scale(1.1)',
              opacity: 0.8,
            },
            '100%': {
              transform: 'scale(1)',
              opacity: 1,
            },
          },
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              background:
                'conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              animation: 'rotate 3s linear infinite',
            },
            '@keyframes rotate': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          }}
        >
          <ConfirmationNumber sx={{ color: 'white', fontSize: 36 }} />
        </Box>
      </Box>

      {/* Loading Spinner */}
      <Box sx={{ position: 'relative', mb: 3 }}>
        <CircularProgress
          size={60}
          thickness={3}
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            animationDuration: '1.5s',
          }}
        />
        <CircularProgress
          variant="determinate"
          value={25}
          size={60}
          thickness={3}
          sx={{
            color: 'rgba(255, 255, 255, 0.3)',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
      </Box>

      {/* Loading Text */}
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          fontWeight: 600,
          textAlign: 'center',
          mb: 1,
          animation: 'fadeInOut 2s ease-in-out infinite',
          '@keyframes fadeInOut': {
            '0%': { opacity: 0.7 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.7 },
          },
        }}
      >
        Loading Ticket IQ
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255, 255, 255, 0.8)',
          textAlign: 'center',
          fontSize: '14px',
        }}
      >
        Please wait while we prepare your dashboard...
      </Typography>

      {/* Loading Dots Animation */}
      <Box
        sx={{
          display: 'flex',
          gap: 0.5,
          mt: 2,
        }}
      >
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              animation: 'bounce 1.4s ease-in-out infinite',
              animationDelay: `${index * 0.16}s`,
              '@keyframes bounce': {
                '0%, 80%, 100%': {
                  transform: 'scale(0.8)',
                  opacity: 0.5,
                },
                '40%': {
                  transform: 'scale(1)',
                  opacity: 1,
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PageLoading;
