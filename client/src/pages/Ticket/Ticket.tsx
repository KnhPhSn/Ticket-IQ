import { Container, Typography, Card, CardContent, Chip } from '@mui/material';
import { formatCreatedAt } from '../../utils/formatDate';
import { formatTicketStatus } from '../../utils/formatTicketStatus';
import { useParams } from 'react-router';
import useGetTicketById from '../../hooks/useGetTicketById';
import TicketSkeleton from './TicketSkeleton';

const Ticket = () => {
  const { id } = useParams();
  const { ticket, loading, error } = useGetTicketById(id!);

  return (
    <Container maxWidth="md" className="py-8">
      <Typography variant="h4" component="h1" className="mb-6 font-bold">
        Ticket Details
      </Typography>

      {loading && <TicketSkeleton />}

      {error && (
        <Typography variant="body1" color="error" className="text-center py-8">
          {error}
        </Typography>
      )}

      {!loading && !error && ticket && (
        <Card>
          <CardContent className="space-y-6">
            <Typography variant="h5" component="h2" className="font-bold">
              {ticket.title}
            </Typography>

            <Typography variant="body1">{ticket.description}</Typography>

            <div className="space-y-4">
              <Typography variant="body1">
                <span className="font-semibold">Status:</span>{' '}
                {formatTicketStatus(ticket.status)}
              </Typography>

              {ticket.priority && (
                <Typography variant="body1">
                  <span className="font-semibold">Priority:</span>{' '}
                  {ticket.priority}
                </Typography>
              )}

              {ticket.relatedSkills && ticket.relatedSkills.length > 0 && (
                <div>
                  <Typography variant="body1" className="font-semibold mb-2">
                    Related Skills:
                  </Typography>
                  <div className="flex flex-wrap gap-1">
                    {ticket.relatedSkills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </div>
                </div>
              )}

              {ticket.helpfulNotes && (
                <div>
                  <Typography variant="body1" className="font-semibold mb-2">
                    Helpful Notes:
                  </Typography>
                  <Typography variant="body1">{ticket.helpfulNotes}</Typography>
                </div>
              )}

              {ticket.assignedTo && (
                <Typography variant="body1">
                  <span className="font-semibold">Assigned to:</span>{' '}
                  {typeof ticket.assignedTo === 'string'
                    ? ticket.assignedTo
                    : ticket.assignedTo.email}
                </Typography>
              )}
            </div>

            <Typography
              variant="caption"
              color="text.secondary"
              className="block pt-4"
            >
              Created at {formatCreatedAt(ticket.createdAt)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Ticket;
