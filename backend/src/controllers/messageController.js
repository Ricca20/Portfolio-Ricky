import Message from '../models/Message.js';
import { sendContactEmail } from '../utils/emailService.js';

// Get all messages (admin only)
export const getMessages = async (req, res, next) => {
  try {
    const { read } = req.query;
    let query = {};
    
    if (read !== undefined) {
      query.read = read === 'true';
    }

    const messages = await Message.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// Get single message (admin only)
export const getMessageById = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Mark as read
    message.read = true;
    await message.save();

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// Create message
export const createMessage = async (req, res, next) => {
  try {
    // Save message to database
    const message = await Message.create(req.body);
    
    // Send email notification
    try {
      await sendContactEmail(req.body);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Continue even if email fails - message is still saved
    }
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// Mark message as read (admin only)
export const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// Delete message (admin only)
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
