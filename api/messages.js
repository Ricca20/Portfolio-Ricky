import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Message Schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

// MongoDB connection
let cachedDb = null;

async function connectDB() {
  if (cachedDb) {
    return cachedDb;
  }
  
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    cachedDb = conn;
    console.log('MongoDB Connected');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Email Service
import nodemailer from 'nodemailer';

async function sendContactEmail({ name, email, message }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `New Portfolio Contact: ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

// Email Verification Service
async function verifyEmail(email) {
  try {
    const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const data = await response.json();
    const { deliverability, is_valid_format, is_disposable_email, is_mx_found } = data;
    
    // Check if email is valid
    if (deliverability === 'UNDELIVERABLE' || 
        !is_valid_format.value || 
        is_disposable_email.value || 
        !is_mx_found.value) {
      return {
        valid: false,
        reason: deliverability === 'UNDELIVERABLE' ? 'Email is undeliverable' :
                !is_valid_format.value ? 'Invalid email format' :
                is_disposable_email.value ? 'Disposable email addresses are not allowed' :
                'Invalid email domain'
      };
    }
    
    return { valid: true };
  } catch (error) {
    console.error('Email verification error:', error.message);
    // If API fails, allow the email (don't block legitimate users)
    return { valid: true };
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Connect to MongoDB on each request
  await connectDB();

  if (req.method === 'POST') {
    try {
      console.log('Received POST request to /api/messages');
      console.log('Request body:', req.body);
      
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        console.log('Validation failed - missing fields');
        return res.status(400).json({
          success: false,
          message: 'Please provide name, email, and message',
          received: { name, email, message }
        });
      }

      // Verify email using AbstractAPI
      console.log('Verifying email address...');
      const emailVerification = await verifyEmail(email);
      
      if (!emailVerification.valid) {
        console.log('Email verification failed:', emailVerification.reason);
        return res.status(400).json({
          success: false,
          message: emailVerification.reason
        });
      }
      console.log('Email verified successfully');

      console.log('Creating message in database...');
      const newMessage = await Message.create({
        name,
        email,
        message
      });
      console.log('Message created successfully:', newMessage._id);

      // Send email notification (don't fail if email fails)
      try {
        console.log('Sending email notification...');
        await sendContactEmail({ name, email, message });
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed (non-critical):', emailError.message);
      }

      return res.status(201).json({
        success: true,
        data: newMessage,
        message: 'Message sent successfully'
      });
    } catch (error) {
      console.error('Error creating message:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send message',
        error: error.message
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { read } = req.query;
      const filter = read !== undefined ? { read: read === 'true' } : {};
      
      const messages = await Message.find(filter).sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch messages'
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }
}
