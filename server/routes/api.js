// home (explore) routes
const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('make your request human');
})


apiRouter.get('/api', (req, res) => {
  res.send('i said make the damn request already');
})
module.exports = apiRouter;