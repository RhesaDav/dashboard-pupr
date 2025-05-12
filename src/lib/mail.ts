import nodemailer from "nodemailer";

type EmailParams = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

export async function sendEmail(params: EmailParams) {
  try {
    const { to, subject, text, html } = params;

    if (!to || !subject || (!text && !html)) {
      throw new Error("Missing required email parameters");
    }

    const transporter = createTransporter();

    const mailOptions = {
      from:
        process.env.EMAIL_FROM || `"Bina Marga" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error(
      `Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
