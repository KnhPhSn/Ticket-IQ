import { Router } from 'express';
import { createTicket, getCreatedTickets, getAssignedTickets, getTicketById } from '../controllers/ticketsController';

const router = Router();

router.post('/', createTicket);
router.get('/created', getCreatedTickets);
router.get('/assigned', getAssignedTickets);
router.get('/:id', getTicketById);

export default router;
