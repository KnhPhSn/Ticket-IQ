import { EventSchemas, Inngest } from 'inngest';

type UserSignUp = {
  data: {
    email: string;
    name: string;
  };
};

type TicketCreated = {
  data: {
    ticketId: string;
  };
};

type Events = {
  'user/signup': UserSignUp;
  'ticket/created': TicketCreated;
};

export const inngest = new Inngest({
  id: 'ai-ticket-system',
  schemas: new EventSchemas().fromRecord<Events>(),
});
