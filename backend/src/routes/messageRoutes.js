import express from 'express';
import {
  getMessages,
  getMessageById,
  createMessage,
  markAsRead,
  deleteMessage
} from '../controllers/messageController.js';

const router = express.Router();

// Public route
router.post('/', createMessage);

// Admin routes (add authentication middleware as needed)
router.get('/', getMessages);
router.get('/:id', getMessageById);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteMessage);

export default router;
