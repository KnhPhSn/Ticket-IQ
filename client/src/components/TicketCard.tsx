import { Card, CardContent, Typography, Box } from '@mui/material';
import { ConfirmationNumber, AccessTime } from '@mui/icons-material';
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
      onClick={() => handleTicketClick(ticket._id)}
      sx={{
        cursor: 'pointer',
        mb: 2,
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 25px 0 rgba(102, 126, 234, 0.15)',
          borderColor: '#667eea',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <ConfirmationNumber sx={{ color: '#667eea', fontSize: 20 }} />
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              color: '#1e293b',
              lineHeight: 1.3,
            }}
          >
            {ticket.title}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
            mb: 3,
            lineHeight: 1.5,
          }}
        >
          {truncateText(ticket.description)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTime sx={{ color: '#94a3b8', fontSize: 16 }} />
          <Typography
            variant="caption"
            sx={{
              color: '#94a3b8',
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            Created {formatCreatedAt(ticket.createdAt)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
