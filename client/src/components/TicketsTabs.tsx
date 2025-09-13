import { Typography, Box, Tabs, Tab, Paper } from '@mui/material';
import { Assignment, PendingActions } from '@mui/icons-material';
import useGetAssignedTickets from '../hooks/useGetAssignedTickets';
import { useEffect, useState } from 'react';
import BriefTicketSkeleton from '../pages/Home/BriefTicketSkeleton';
import TicketCard from './TicketCard';
import type { Ticket } from 'src/types/tickets';
import { useSocket } from '../context/SocketContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TicketTabsProps {
  createdTickets: Ticket[];
  createdLoading: boolean;
  createdError: string | null;
}

const TicketTabs: React.FC<TicketTabsProps> = ({
  createdTickets,
  createdLoading,
  createdError,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const {
    tickets: assignedTickets,
    loading: assignedLoading,
    error: assignedError,
    fetchAssignedTickets,
  } = useGetAssignedTickets();
  const { socket } = useSocket();

  useEffect(() => {
    fetchAssignedTickets();
  }, [fetchAssignedTickets]);

  useEffect(() => {
    if (!socket) return;
    socket.on('ticket-assigned-to-you', () => {
      fetchAssignedTickets();
    });

    return () => {
      socket.off('ticket-assigned-to-you');
    };
  }, [socket, fetchAssignedTickets]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '20px',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 4, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Assignment sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Tickets
          </Typography>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="ticket tabs"
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              height: 3,
              borderRadius: '3px',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '14px', sm: '16px' },
              color: '#64748b',
              minHeight: { xs: 48, sm: 'auto' },
              padding: { xs: '8px 12px', sm: '12px 16px' },
              '&.Mui-selected': {
                color: '#667eea',
              },
              '& .MuiTab-iconWrapper': {
                fontSize: { xs: '18px', sm: '24px' },
              },
            },
          }}
        >
          <Tab
            icon={<PendingActions />}
            iconPosition="start"
            label={
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                Created Tickets
              </Box>
            }
            aria-label="Created Tickets"
            {...a11yProps(0)}
            sx={{
              '& .MuiTab-iconWrapper': {
                marginRight: { xs: 0, sm: 1 },
                marginBottom: { xs: 0.5, sm: 0 },
              },
            }}
          />
          <Tab
            icon={<Assignment />}
            iconPosition="start"
            label={
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                Assigned Tickets
              </Box>
            }
            aria-label="Assigned Tickets"
            {...a11yProps(1)}
            sx={{
              '& .MuiTab-iconWrapper': {
                marginRight: { xs: 0, sm: 1 },
                marginBottom: { xs: 0.5, sm: 0 },
              },
            }}
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ px: 4, pb: 4 }}>
          {createdLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <BriefTicketSkeleton key={index} />
            ))}

          {createdError && (
            <Typography
              variant="body1"
              color="error"
              sx={{ textAlign: 'center', py: 4 }}
            >
              {createdError}
            </Typography>
          )}

          {!createdLoading && !createdError && createdTickets.length === 0 && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: 'center', py: 4 }}
            >
              No created tickets found.
            </Typography>
          )}

          {!createdLoading &&
            !createdError &&
            createdTickets.length > 0 &&
            createdTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ px: 4, pb: 4 }}>
          {assignedLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <BriefTicketSkeleton key={index} />
            ))}

          {assignedError && (
            <Typography
              variant="body1"
              color="error"
              sx={{ textAlign: 'center', py: 4 }}
            >
              {assignedError}
            </Typography>
          )}

          {!assignedLoading &&
            !assignedError &&
            assignedTickets.length === 0 && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 4 }}
              >
                No assigned tickets found.
              </Typography>
            )}

          {!assignedLoading &&
            !assignedError &&
            assignedTickets.length > 0 &&
            assignedTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
        </Box>
      </TabPanel>
    </Paper>
  );
};

export default TicketTabs;
