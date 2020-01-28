//recording routes
const express = require('express');
const { saveCollection, getCollectionRecordings } = require('../db/helpers/collection');
const collectionRouter = express.Router();

collectionRouter.get('/:collectionId', (req, res) => {
  const { collectionId } = req.params;

  getCollectionRecordings(collectionId)
  .then(rows => {
    res.send(rows);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(404);
  })

});

collectionRouter.post('/save', (req, res) => {
  const { body } = req;

  // {
  //   "id_user_creator": "3",
  //     "title": "here and there",
  //       "description": "greens and worms and skies",
  //         "url_image": "https://i.pinimg.com/originals/0a/49/dc/0a49dc8f71f66b32dc39cfc96966b205.jpg"
  // }

  saveCollection(body)
    .then(success => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      debugger;
      res.sendStatus(400);
    })

});

module.exports = collectionRouter;