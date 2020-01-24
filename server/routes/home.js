// home (explore) routes
const express = require('express');
const { getHomeRecordings, getHomeCollections } = require('../db/helpers/home');
const homeRouter = express.Router();

homeRouter.get('', (req, res) => {
  const homeContent = {
    collections: [],
    recordings: [],
  };

  getHomeRecordings()
  .then(rows => {
    homeContent.recordings.push(rows);
    getHomeCollections()
    .then(rows => {
      homeContent.collections.push(rows);
      res.send(homeContent);
    });
  })
  .catch(err => {
    debugger;
    res.sendStatus(404);
  });

})

module.exports = homeRouter;