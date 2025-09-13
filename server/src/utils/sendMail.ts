import nodemailer, { type TransportOptions } from 'nodemailer';

export const sendMail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  } as TransportOptions);
  try {
    const info = await transporter.sendMail({
      from: '"noreply" <noreply@test.com>',
      to,
      subject,
      text,
    });
    console.log(`Message sent: ${info.messageId}`);
    return info;
  } catch (err) {
    console.log(`Mail error: ${(err as Error).message}`);
  }
};
