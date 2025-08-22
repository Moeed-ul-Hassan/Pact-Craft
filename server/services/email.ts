interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(
  apiKey: string,
  params: EmailParams
): Promise<boolean> {
  try {
    // Check if SendGrid is available
    if (!process.env.SENDGRID_API_KEY || !apiKey) {
      console.log('SendGrid not configured - email sending disabled');
      return false;
    }

    // Dynamic import to avoid startup errors
    const sendgridMail = await import('@sendgrid/mail');
    sendgridMail.default.setApiKey(apiKey);

    await sendgridMail.default.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}
