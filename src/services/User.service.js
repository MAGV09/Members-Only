const User = require('../models/User');

async function createUser({ firstName, lastName, username, password }) {
  const user = await User.create({ firstName, lastName, username, password });
  return user;
}

module.exports = {
  createUser,
};
