// library routes
const express = require('express');
const libraryRouter = express.Router();
const { getAllLibraryContent } = require('../db/helpers/library');

libraryRouter.get('/:username/:userId', (req, res) => {
  const { userId } = req.params;
  
  getAllLibraryContent(userId)
    .then(libraryContent => {
      res.send(libraryContent);
    })
    .catch(err => {
      console.error(err);
      debugger;
      res.sendStatus(404);
    });
});

module.exports = libraryRouter;