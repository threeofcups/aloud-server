// profile routes
const express = require('express');
const profileRouter = express.Router();
const { getAllProfileContent } = require('../db/helpers/profile');

profileRouter.get('/:username/:userId', (req, res) => {
  const { userId } = req.params;
  
  getAllProfileContent(userId)
  .then(profileContent => {
    res.send(profileContent);
  })
  .catch(err => {
    res.sendStatus(404);
  });
});

module.exports = profileRouter;