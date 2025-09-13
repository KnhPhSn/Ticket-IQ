import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <Container maxWidth="md" className="py-8">
      <div className="text-center space-y-6">
        <Typography
          variant="h1"
          component="h1"
          className="text-6xl font-bold text-gray-500"
        >
          404
        </Typography>

        <Typography variant="h4" component="h2" className="font-bold">
          Page Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary">
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Return to Home
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
