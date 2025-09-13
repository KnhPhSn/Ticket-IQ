import {
  Container,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { Add, ConfirmationNumber } from '@mui/icons-material';
import { useState } from 'react';
import useCreateTicket from '../../hooks/useCreateTicket';
import useGetCreatedTickets from '../../hooks/useGetCreatedTickets';
import TicketTabs from '../../components/TicketsTabs';

const Home = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {
    setTickets,
    tickets: createdTickets,
    loading: createdLoading,
    error: createdError,
  } = useGetCreatedTickets();
  const {
    loading: creating,
    error: createError,
    createTicket,
  } = useCreateTicket();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTicket = await createTicket(title, description);
    if (newTicket) {
      setTickets((prevTickets) => [newTicket, ...prevTickets]);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3 },
      }}
    >
      {/* Create Ticket Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          mb: { xs: 4, sm: 6 },
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
            mb: { xs: 2, sm: 3 },
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
            <Add sx={{ color: 'white', fontSize: { xs: 20, sm: 24 } }} />
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
            Create New Ticket
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Ticket Title"
              variant="outlined"
              placeholder="Enter a descriptive title for your ticket"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                '& .MuiInputLabel-root': {
                  color: '#64748b',
                  '&.Mui-focused': {
                    color: '#667eea',
                  },
                },
              }}
            />

            <Box>
              <Typography
                variant="body2"
                sx={{ color: '#64748b', mb: 1, fontWeight: 500 }}
              >
                Description
              </Typography>
              <TextareaAutosize
                minRows={4}
                maxRows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your issue in detail..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  resize: 'none',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease-in-out',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                }}
              />
            </Box>

            {createError && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  background:
                    'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                  border: '1px solid #fca5a5',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: '#dc2626', fontWeight: 500 }}
                >
                  {createError}
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              size="large"
              type="submit"
              loading={creating}
              startIcon={<ConfirmationNumber />}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 4px 15px 0 rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  boxShadow: '0 6px 20px 0 rgba(102, 126, 234, 0.4)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Create Ticket
            </Button>
          </Box>
        </form>
      </Paper>

      {/* All Tickets Section */}
      <TicketTabs
        createdTickets={createdTickets}
        createdLoading={createdLoading}
        createdError={createdError}
      />
    </Container>
  );
};

export default Home;
