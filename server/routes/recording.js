//recording routes
const express = require('express');
const { saveRecording } = require('../db/helpers/recording');
const recordingRouter = express.Router();

recordingRouter.get('/', (req, res) => {
  res.send('reccy reccy reccy');
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