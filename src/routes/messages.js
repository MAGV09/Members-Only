const { Router } = require('express');
const messagesRouter = Router();
const {
  getMessagesForm,
  createMessage,
  deleteMessage,
} = require('../controllers/Messages.controller');
messagesRouter.get('/create', getMessagesForm);
messagesRouter.post('/create', createMessage);
messagesRouter.delete('/delete/:id', deleteMessage);

module.exports = messagesRouter;
