import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  Paper,
} from '@mui/material';
import {
  ConfirmationNumber,
  AccessTime,
  Assignment,
  Psychology,
  Person,
} from '@mui/icons-material';
import { formatCreatedAt } from '../../utils/formatDate';
import { formatTicketStatus } from '../../utils/formatTicketStatus';
import { useParams } from 'react-router';
import useGetTicketById from '../../hooks/useGetTicketById';
import TicketSkeleton from './TicketSkeleton';

const Ticket = () => {
  const { id } = useParams();
  const { ticket, loading, error } = useGetTicketById(id!);

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          mb: { xs: 3, sm: 4 },
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
            <ConfirmationNumber
              sx={{ color: 'white', fontSize: { xs: 20, sm: 24 } }}
            />
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
            Ticket Details
          </Typography>
        </Box>
      </Paper>

      {loading && <TicketSkeleton />}

      {error && (
        <Typography variant="body1" color="error" className="text-center py-8">
          {error}
        </Typography>
      )}

      {!loading && !error && ticket && (
        <Card
          sx={{
            borderRadius: { xs: '12px', sm: '16px' },
            border: '1px solid #e2e8f0',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2.5, sm: 3 },
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: '#1e293b',
                  lineHeight: 1.3,
                }}
              >
                {ticket.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#475569',
                  lineHeight: 1.6,
                  fontSize: '16px',
                }}
              >
                {ticket.description}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Assignment sx={{ color: '#667eea', fontSize: 20 }} />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: '#374151' }}
                  >
                    Status:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#475569' }}>
                    {formatTicketStatus(ticket.status)}
                  </Typography>
                </Box>

                {ticket.priority && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Psychology sx={{ color: '#667eea', fontSize: 20 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: '#374151' }}
                    >
                      Priority:
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#475569' }}>
                      {ticket.priority}
                    </Typography>
                  </Box>
                )}

                {ticket.relatedSkills && ticket.relatedSkills.length > 0 && (
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: '#374151', mb: 1 }}
                    >
                      Related Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {ticket.relatedSkills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          sx={{
                            backgroundColor: '#ede9fe',
                            color: '#7c3aed',
                            border: '1px solid #c4b5fd',
                            '&:hover': {
                              backgroundColor: '#ddd6fe',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {ticket.helpfulNotes && (
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: '#374151', mb: 1 }}
                    >
                      Helpful Notes:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: '#475569', lineHeight: 1.6 }}
                    >
                      {ticket.helpfulNotes}
                    </Typography>
                  </Box>
                )}

                {ticket.assignedTo && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person sx={{ color: '#667eea', fontSize: 20 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: '#374151' }}
                    >
                      Assigned to:
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#475569' }}>
                      {typeof ticket.assignedTo === 'string'
                        ? ticket.assignedTo
                        : ticket.assignedTo.email}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  pt: 2,
                  borderTop: '1px solid #e2e8f0',
                }}
              >
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
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Ticket;
