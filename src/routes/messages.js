const { Router } = require('express');
const messagesRouter = Router();

messagesRouter.get('/create');
messagesRouter.post('/create');
messagesRouter.delete('/delete/:id');
