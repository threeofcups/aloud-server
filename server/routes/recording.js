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

recordingRouter.post('', (req, res) => {
  const { body } = req;

  // {
  //   "id_user": "3",
  //     "title": "dust it off",
  //       "description": "west texas track",
  //         "url_recording": "https://www.nasa.gov/mp3/581097main_STS-1_Dust-it-Off.mp3",
  //           "published": "public",
  //             "speech_to_text": "a pink cloud"
  // }

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