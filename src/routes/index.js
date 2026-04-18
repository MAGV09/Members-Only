const { Router } = require('express');
const indexRouter = Router();
const {
  getHomepage,
  getMembershipPage,
  handleMembership,
} = require('../controllers/Index.controller');

indexRouter.get('/', getHomepage);
indexRouter.get('/membership', getMembershipPage);
indexRouter.post('/membership', handleMembership);
module.exports = indexRouter;
