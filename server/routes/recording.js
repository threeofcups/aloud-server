//recording routes
const express = require('express');
const { saveRecording, saveToCollection } = require('../db/helpers/recording');
const recordingRouter = express.Router();

recordingRouter.post('/:collectionId', (req, res) => {
  const { collectionId } = req.params;
  const { recordingId } = req.body;

  /*incoming body example
  * {
  *  "recordingId": "4"
  * }
  */
 
  saveToCollection(collectionId, recordingId)
  .then(success => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(404);
  });

});

recordingRouter.post('/save', (req, res) => {
  const { body } = req;

  // {
  //   "id_user": "1",
  //     "title": "sample_title",
  //       "description": "sample_description",
  //         "url_recording": "cloudinary.mp3",
  //           "published": "public",
  //             "speech_to_text": "sample sample sample",
  // }

  // body;
  // debugger;

  saveRecording(body)
  .then(success => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.error(err);
    debugger;
    res.sendStatus(400);
  })

});

module.exports = recordingRouter;