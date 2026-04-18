const { body } = require('express-validator');

const messages = [
  body('messageTitle')
    .trim()
    .notEmpty()
    .withMessage('title is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),

  body('messageBody')
    .notEmpty()
    .withMessage('body is required')
    .isLength({ max: 200 })
    .withMessage('Max length is 200'),
];

module.exports = { messages };
