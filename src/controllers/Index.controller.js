const MessageService = require('../services/Message.service');
const UserService = require('../services/User.service');
require('dotenv').config({ quiet: true });

async function getHomepage(req, res) {
  if (req.user) {
    console.log(res.locals.currentUser);
  }
  const messages = await MessageService.getAllMessages();
  console.log(messages);
  res.render('index', { title: 'Homepage', messages });
}

async function getMembershipPage(req, res) {
  res.render('membership', { title: 'Membership' });
}

async function handleMembership(req, res) {
  const password = req.body.membershipPassword;
  console.log(password);
  if (password === process.env.MEMBERSHIP_PASSWORD) {
    await UserService.setMembership(res.locals.currentUser.id);
  }
  res.redirect('/');
}
module.exports = { getHomepage, getMembershipPage, handleMembership };
