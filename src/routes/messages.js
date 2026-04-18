const { Router } = require('express');
const messagesRouter = Router();
const {
  getMessagesForm,
  createMessage,
  deleteMessage,
} = require('../controllers/Messages.controller');
const validateRequest = require('../middleware/validateRequest');
const messagesValidation = require('../validation/messages');
const { requireAuth } = require('../middleware/auth');
messagesRouter.get('/create', requireAuth, messagesValidation, validateRequest, getMessagesForm);
messagesRouter.post('/create', requireAuth, messagesValidation, validateRequest, createMessage);
messagesRouter.delete('/delete/:id', requireAuth, deleteMessage);

module.exports = messagesRouter;
