import { Resend } from "resend";
import mailConfig from "@/config/mail.js";
import { AppError } from "@/errors/appError.js";
import ResponseStatus from "@/config/status.js";

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
    throw new AppError(ResponseStatus.INTERNAL_SERVER_ERROR, error.message ?? "Verification mail send failed");
  }

  return data;
};
