import { inngest } from '../client';
import { sendMail } from '../../utils/sendMail';

export const onUserSignup = inngest.createFunction(
  { id: 'user-signup-email' },
  { event: 'user/signup' },
  async ({ event, step }) => {
    const { email, name } = event.data;
    try {
      await step.run('send-welcome-email', async () => {
        const subject = `Welcome to the app`;
        const message = `Hi ${name},\n\tThanks for signing up. We're glad to have you onboard!`;
        await sendMail(email, subject, message);
      });
      return { success: true };
    } catch (err) {
      console.error(
        `onUserSignup: Error running step ${(err as Error).message}`
      );
      return { success: false };
    }
  }
);
