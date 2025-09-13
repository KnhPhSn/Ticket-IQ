import { inngest } from '../client';
import { analyzeTicket } from '../../utils/analyzeTicket';
import { sendMail } from '../../utils/sendMail';
import Ticket, { type TicketType } from '../../models/Ticket';
import { NonRetriableError } from 'inngest';
import User, { type UserType } from '../../models/User';
import { io } from '../../index';

export const onTicketCreated = inngest.createFunction(
  { id: 'ticket-created' },
  { event: 'ticket/created' },
  async ({ event, step }) => {
    const { ticketId } = event.data;
    try {
      const ticket = await step.run(
        'fetch-ticket',
        async (): Promise<TicketType> => {
          const ticketObj = await Ticket.findById(ticketId);
          if (!ticketObj) throw new NonRetriableError('Ticket not found');
          io.to(ticketObj.createdBy.toString()).emit('analyzing-ticket');
          return ticketObj;
        }
      );
      const aiRes = await analyzeTicket(ticket);
      const relatedSkills: string[] = await step.run(
        'ai-processing',
        async () => {
          if (!aiRes) return [];
          await Ticket.findByIdAndUpdate(ticketId, {
            priority: aiRes.priority,
            helpfulNotes: aiRes.helpfulNotes,
            status: 'IN_PROGRESS',
            relatedSkills: aiRes.relatedSkills,
          });
          return aiRes.relatedSkills;
        }
      );
      const moderator = await step.run(
        'assign-moderator',
        async (): Promise<UserType | null> => {
          io.to(ticket.createdBy.toString()).emit('assigning-moderator');
          const user = await User.findOne({
            role: 'moderator',
            skills: { $in: relatedSkills },
          });
          // if the user does not exist, assign the ticket to the admin
          return user || (await User.findOne({ role: 'admin' }));
        }
      );
      await step.run('update-assigned-ticket', async () => {
        if (!moderator) return;
        await Ticket.findByIdAndUpdate(ticketId, {
          assignedTo: (moderator as any)._id,
          status: 'ASSIGNED',
        });
        io.to(ticket.createdBy.toString()).emit('ticket-assigned', ticketId);
        io.to((moderator as any)._id.toString()).emit('ticket-assigned-to-you', ticketId);
      });
      await step.run('send-email-notification', async () => {
        if (!moderator) return;
        const finalTicket = (await Ticket.findById(ticketId)) as TicketType;
        const title = `New Ticket Assigned | ${finalTicket.title}`;
        const message = `Hello ${moderator.name},\nYou have been assigned a new ticket.\n\nTitle: ${finalTicket.title}\nPriority: ${finalTicket.priority}\n\nPlease review it when you have a chance.\n\nRegards,\nSupport Team`;
        await sendMail(moderator.email, title, message);
      });
      return { success: true };
    } catch (err) {
      console.error(
        `onTicketCreated: Error running step ${(err as Error).message}`
      );
      return { success: false };
    }
  }
);
