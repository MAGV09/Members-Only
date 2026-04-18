const MessageService = require('../services/Message.service');
async function getHomepage(req, res) {
  const messages = await MessageService.getAllMessages();
  console.log(messages);
  res.render('index', { title: 'Homepage', messages });
}

module.exports = { getHomepage };
