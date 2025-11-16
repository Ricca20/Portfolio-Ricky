import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email notification when contact form is submitted
export const sendContactEmail = async (messageData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'pereraricky20@gmail.com',
      subject: `Portfolio Contact: ${messageData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #0891b2;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #e5e7eb;">
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>From:</strong> ${messageData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${messageData.email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${messageData.subject}</p>
          </div>
          
          <hr style="border: 1px solid #e5e7eb;">
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${messageData.message}</p>
          </div>
          
          <hr style="border: 1px solid #e5e7eb;">
          
          <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email notification');
  }
};
