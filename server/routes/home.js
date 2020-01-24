// home (explore) routes
const express = require('express');
const { getHomeRecordings } = require('../db/helpers/home');
const homeRouter = express.Router();

homeRouter.get('', (req, res) => {
  getHomeRecordings()
  .then(rows => {
    res.send(rows);
  })
  .catch(err => {
    debugger;
    res.sendStatus(404);
  });

})

module.exports = homeRouter;