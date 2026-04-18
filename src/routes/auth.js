const { Router } = require('express');
const authRouter = Router();
const passport = require('../config/passport');
const {
  getSignUpPage,
  createUser,
  getLoginPage,
  handleLogin,
  handleLogout,
} = require('../controllers/Auth.controller');
const { redirectIfAuthenticated } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const { signUpValidation, loginValidation } = require('../validation/auth');

authRouter.get('/sign-up', redirectIfAuthenticated, getSignUpPage);

authRouter.post('/sign-up', signUpValidation, validateRequest, createUser);

authRouter.get('/login', redirectIfAuthenticated, getLoginPage);

authRouter.post(
  '/login',
  loginValidation,
  validateRequest,
  handleLogin,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  }),
);

authRouter.get('/logout', handleLogout);

module.exports = authRouter;
