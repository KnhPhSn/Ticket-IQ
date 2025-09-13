import {
  Container,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  Box,
} from '@mui/material';
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
    <Container maxWidth="md" className="py-8">
      {/* Create Ticket Section */}
      <Box className="mb-10">
        <Typography variant="h4" component="h1" className="mb-4 font-bold">
          Create Ticket
        </Typography>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Ticket Title"
            variant="outlined"
            placeholder="Enter ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextareaAutosize
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            minRows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxRows={4}
            placeholder="Ticket Description"
            style={{ fontFamily: 'inherit' }}
          />

          {createError && (
            <Typography variant="body2" color="error">
              {createError}
            </Typography>
          )}

          <Button
            variant="contained"
            size="large"
            className="bg-blue-600 hover:bg-blue-700"
            type="submit"
            loading={creating}
          >
            Submit Ticket
          </Button>
        </form>
      </Box>

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
