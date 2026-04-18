const Message = require('../models/Message');

async function getAllMessages() {
  const messages = await Message.findAll();
  return messages;
}

module.exports = {
  getAllMessages,
};
