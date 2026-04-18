const Message = require('../models/Message');
const createError = require('http-errors');
async function getAllMessages() {
  const messages = await Message.findAll();
  return messages;
}
async function deleteMessage(id) {
  const message = await Message.findById(id);
  if (!message) {
    throw createError(404, `Couldn't find the resource`);
  }
  const deletedMessage = await Message.deleteById(id);
  return deletedMessage;
}

async function createMessage({ title, text, userId }) {
  const message = await Message.create({ title, text, userId });
  return message;
}
module.exports = {
  getAllMessages,
  deleteMessage,
  createMessage,
};
