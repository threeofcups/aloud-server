// library routes
const express = require('express');
const libraryRouter = express.Router();

libraryRouter.get('/', (req, res) => {
  res.send('quiet in the library please');
});

module.exports = libraryRouter;