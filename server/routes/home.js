// home (explore) routes
const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  res.send('lets explore!');
})

module.exports = homeRouter;