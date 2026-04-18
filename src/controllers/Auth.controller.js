const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const UserService = require('../services/User.service');
const { matchedData } = require('express-validator');

async function getSignUpPage(req, res) {
  res.render('sign-up-form', { title: 'Sign Up' });
}
async function createUser(req, res) {
  if (res.locals.validationErrors) {
    return res.status(400).render('sign-up-form', { title: 'Sign Up' });
  }
  const { username, password, firstName, lastName } = matchedData(req);
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserService.createUser({ username, password: hashedPassword, firstName, lastName });
  res.redirect('/');
}

async function getLoginPage(req, res) {
  const errorMessages = req.session?.messages ?? [];
  req.session.messages = []; // clear after reading
  res.render('login-form', { title: 'Login', authenticationError: errorMessages.at(-1) });
}

async function handleLogin(req, res, next) {
  if (res.locals.validationErrors) {
    return res.status(400).render('login-form', { title: 'Login' });
  }
  next();
}

function handleLogout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
}
module.exports = { getSignUpPage, createUser, getLoginPage, handleLogin, handleLogout };
