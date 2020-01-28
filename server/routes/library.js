// library routes
const express = require('express');
const libraryRouter = express.Router();
const { getAllLibraryContent, saveRecordingLibrary, saveCollectionLibrary } = require('../db/helpers/library');

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

libraryRouter.post('/save/recording/:recordingId', (req, res) => {
  const { recordingId } = req.params;
  const { userId } = req.body;

  /* incoming body sample
  * {
  *   "userId": "3"
  * }
  */

  saveRecordingLibrary(userId, recordingId)
    .then(success => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      debugger;
      res.sendStatus(404);
    });
});

libraryRouter.post('/save/collection/:collectionId', (req, res) => {
  const { collectionId } = req.params;
  const { userId } = req.body;

  /* incoming body sample
  * {
  *   "userId": "4"
  * }
  */

  saveCollectionLibrary(userId, collectionId)
    .then(success => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
});

module.exports = libraryRouter;