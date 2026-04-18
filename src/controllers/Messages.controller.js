const MessageService = require('../services/Message.service');
const { matchedData } = require('express-validator');

async function deleteMessage(req, res) {
  const id = req.params.id;
  await MessageService.deleteMessage(id);
  res.json({ redirect: '/' });
}
async function getMessagesForm(req, res) {
  res.render('messages-form', { title: 'Messages Form' });
}
async function createMessage(req, res) {
  const { messageTitle, messageBody } = matchedData(req);
  await MessageService.createMessage({
    title: messageTitle,
    text: messageBody,
    userId: res.locals.currentUser.id,
  });
  res.redirect('/');
}
module.exports = {
  deleteMessage,
  createMessage,
  getMessagesForm,
};
