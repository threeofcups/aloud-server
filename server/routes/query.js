const express = require('express');
const { stageQueryData, fuser } = require('../db/fuse/query');

const queryRouter = express.Router();

queryRouter.post('/:query', (req, res) => {
  const { query } = req.params;

  fuser()
  .then(async(fuse) => {
    const queryResults = await fuse.search(query);
    res.send(queryResults);
  })
  .catch(err => {
    console.error(err);
    debugger;
    res.sendStatus(404);
  });

});

module.exports = queryRouter;