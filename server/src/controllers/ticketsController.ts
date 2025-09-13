import { Request, Response } from 'express';
import CustomAPIError from '../errors/CustomAPIError';
import { StatusCodes } from 'http-status-codes';
import Ticket, { type TicketType } from '../models/Ticket';
import type { CreateRequest } from '../types/tickets';
import { inngest } from '../inngest/client';

export const createTicket = async (
  req: Request<{}, {}, CreateRequest>,
  res: Response
) => {
  const { title, description } = req.body;
  if (!title || !description) {
    throw new CustomAPIError(
      'Bad Request. Please provide title and description',
      StatusCodes.BAD_REQUEST
    );
  }
  const ticket = await Ticket.create({
    title,
    description,
    createdBy: req.user?.userId,
  });
  await inngest.send({
    name: 'ticket/created',
    data: { ticketId: ticket._id.toString() },
  });
  res
    .status(StatusCodes.CREATED)
    .json({ message: 'Ticket created successfully', ticket });
};

export const getCreatedTickets = async (req: Request, res: Response) => {
  const user = req.user!;
  let tickets: TicketType[] = [];
  if (user.role !== 'admin') {
    tickets = await Ticket.find({ createdBy: user.userId })
      .select('title description createdAt status assignedTo')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
  } else {
    tickets = await Ticket.find({})
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
  }
  res.json(tickets);
};

export const getAssignedTickets = async (req: Request, res: Response) => {
  const user = req.user!;
  const tickets = await Ticket.find({ assignedTo: user.userId })
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });
  res.json(tickets);
};

export const getTicketById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = req.user!;
  const ticketId = req.params.id;
  let ticket: TicketType | null = null;

  if (user.role === 'user') {
    ticket = await Ticket.findOne({ createdBy: user.userId, _id: ticketId })
      .select('title description createdAt status assignedTo')
      .populate('assignedTo', 'name email');
  } else {
    ticket = await Ticket.findById(ticketId)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');
  }

  if (!ticket) {
    throw new CustomAPIError('Ticket Not Found', StatusCodes.NOT_FOUND);
  }
  res.json({ ticket });
};
