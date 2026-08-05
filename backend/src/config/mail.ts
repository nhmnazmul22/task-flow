export default {
  FROM_MAIL: process.env.RESEND_FROM_MAIL ?? "Acme <onboarding@resend.dev>",
  Resend: {
    API_KEY: process.env.RESEND_API_KEY ?? "",
  },
};
