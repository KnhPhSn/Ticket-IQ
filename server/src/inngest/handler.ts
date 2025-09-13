import { serve } from 'inngest/express';
import { inngest } from './client';
import { onUserSignup } from './functions/onUserSignup';
import { onTicketCreated } from './functions/onTicketCreated';

export const inngestHandler = serve({
  client: inngest,
  functions: [onUserSignup, onTicketCreated],
});
