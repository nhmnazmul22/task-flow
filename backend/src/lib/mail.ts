import { Resend } from "resend";
import mailConfig from "@/config/mail.js";

const resend = new Resend(mailConfig.Resend.API_KEY);

export const sendMail = async (
  toMail: string,
  subject: string,
  html: string,
) => {
  const { data, error } = await resend.emails.send({
    from: mailConfig.FROM_MAIL,
    to: [toMail],
    subject,
    html,
  });

  if (error) {
    return console.error({ error });
  }

  return data;
};
