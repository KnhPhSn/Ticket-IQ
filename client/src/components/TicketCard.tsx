import { Card, CardContent, Typography } from '@mui/material';
import { truncateText } from '../utils/truncateText';
import { formatCreatedAt } from '../utils/formatDate';
import type { Ticket } from '../types/tickets';
import { useNavigate } from 'react-router';

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const navigate = useNavigate();

  const handleTicketClick = (ticketId: string) => {
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <Card
      key={ticket._id}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 mb-4"
      onClick={() => handleTicketClick(ticket._id)}
    >
      <CardContent>
        <Typography variant="h6" component="h3" className="font-bold mb-2">
          {ticket.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-3">
          {truncateText(ticket.description)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Created at {formatCreatedAt(ticket.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
