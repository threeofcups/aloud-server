// profile routes
const express = require('express');
const profileRouter = express.Router();

profileRouter.get('/', (req, res) => {
  res.send('nice profile you got');
});

module.exports = profileRouter;