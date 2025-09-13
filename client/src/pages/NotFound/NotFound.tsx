import { Container, Typography, Button, Box } from '@mui/material';
import { Home, Error } from '@mui/icons-material';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 4 },
        }}
      >
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <Error sx={{ color: 'white', fontSize: 60 }} />
        </Box>

        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: '6rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: '#1e293b',
            mb: 1,
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#64748b',
            fontSize: '18px',
            maxWidth: '400px',
            lineHeight: 1.6,
          }}
        >
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<Home />}
          sx={{
            py: 1.5,
            px: 4,
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
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Return to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
