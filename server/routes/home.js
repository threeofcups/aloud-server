// home (explore) routes
const express = require('express');
const { getHomeRecordings, getHomeCollections, getRecentlySaved } = require('../db/helpers/home');
const homeRouter = express.Router();

homeRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const homeContent = [{
    recent: [],
    collections: [],
    recordings: [],
  }];

  getHomeRecordings(userId)
  .then(rows => {
    homeContent[0].recordings = rows;
    getHomeCollections(userId)
    .then(rows => {
      homeContent[0].collections = rows;
      getRecentlySaved(userId)
      .then(rows => {
        homeContent[0].recent = rows;
        res.send(homeContent);
      })
    });
  })
  .catch(err => {
    debugger;
    res.sendStatus(404);
  });

})

module.exports = homeRouter;