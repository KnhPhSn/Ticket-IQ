import { Typography, Box, Tabs, Tab } from '@mui/material';
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
    <Box>
      <Typography variant="h4" component="h2" className="mb-4 font-bold">
        All Tickets
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="ticket tabs"
        >
          <Tab label="Created Tickets" {...a11yProps(0)} />
          <Tab label="Assigned Tickets" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {createdLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <BriefTicketSkeleton key={index} />
          ))}

        {createdError && (
          <Typography
            variant="body1"
            color="error"
            className="text-center py-8"
          >
            {createdError}
          </Typography>
        )}

        {!createdLoading && !createdError && createdTickets.length === 0 && (
          <Typography
            variant="body1"
            color="text.secondary"
            className="text-center py-8"
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
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {assignedLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <BriefTicketSkeleton key={index} />
          ))}

        {assignedError && (
          <Typography
            variant="body1"
            color="error"
            className="text-center py-8"
          >
            {assignedError}
          </Typography>
        )}

        {!assignedLoading && !assignedError && assignedTickets.length === 0 && (
          <Typography
            variant="body1"
            color="text.secondary"
            className="text-center py-8"
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
      </TabPanel>
    </Box>
  );
};

export default TicketTabs;
