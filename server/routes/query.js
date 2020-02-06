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


//pseudocode search by recording AND collection
//make a fuser for recordings and for collections
//call recording fuser and then collection fuser
//send back an object with recording results and collection results
//asign the recording results to the recording hook variable
//the collection results to the collection hook variable
//if the recording and collection results are null or search error -> return 'try again' response and...
  //show the default recordings and collections (don't show defaults if one comes back with responses)