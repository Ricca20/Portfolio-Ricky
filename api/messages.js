import connectDB from '../../backend/src/config/db.js';
import Message from '../../backend/src/models/Message.js';
import { sendContactEmail } from '../../backend/src/utils/emailService.js';

// Connect to MongoDB
connectDB();

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

  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Please provide name, email, and message'
        });
      }

      const newMessage = await Message.create({
        name,
        email,
        message
      });

      // Send email notification (don't wait for it)
      try {
        await sendContactEmail({ name, email, message });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }

      res.status(201).json({
        success: true,
        data: newMessage
      });
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message'
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
