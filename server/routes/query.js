const express = require('express');
const { recordingFuser, collectionFuser } = require('../db/fuse/query');
const { retrieveCollectionObjects } = require('../db/helpers/collection');

const queryRouter = express.Router();

queryRouter.post('/:query', (req, res) => {
  const { query } = req.params;

  const queryResults = [{
    recordingMatches: [],
    collectionMatches: []
  }];

  recordingFuser()
  .then(async(recordingFuse) => {
    queryResults[0].recordingMatches = await recordingFuse.search(query);
    collectionFuser()
    .then(async(collectionFuse) => {
      queryResults[0].collectionMatches = await collectionFuse.search(query);
      res.send(queryResults);
    }) 
  })
  .catch(err => {
    console.error(err);
    debugger;
    res.sendStatus(404);
  });

});


module.exports = queryRouter;
