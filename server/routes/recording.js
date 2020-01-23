//recording routes
const express = require('express');
const recordingRouter = express.Router();

recordingRouter.get('/', (req, res) => {
  res.send('reccy reccy reccy');
});

module.exports = recordingRouter;