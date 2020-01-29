//user routes
const express = require('express');
const { saveNewUser, getUserId } = require('../db/helpers/users');
const usersRouter = express.Router();

usersRouter.get('/login/:googleId', (req, res) => {
  //incoming parameter example
  // 111595094517834967132
  const { googleId } = req.params;

  //expected response
  // [
  //   {
  //     "id": 1
  //   }
  // ]

  getUserId(googleId)
  .then(userIdRows => {
    res.send(userIdRows);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(404);
  })


});


usersRouter.post('/signup', (req, res) => {
  const { user } = req.body;

  //post user on sign up with google

  // example JSON
  // {
  //   "user": {
  //     "email": "dotbehrens@gmail.com",
  //       "familyName": "Behrens",
  //         "givenName": "Dot",
  //           "id": "111595094517834967132",
  //             "name": "Dot Behrens",
  //               "photoUrl": "https://lh3.googleusercontent.com/a-/AAuE7mA1aC5cf9-8qJDBpQdnp0ASlYBnm9bY9rz-OTKo7w"

  //   }
  // }

  saveNewUser(user)
    .then(success => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      debugger;
      res.sendStatus(404);
    });
});

module.exports = usersRouter;