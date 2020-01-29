//user routes
const express = require('express');
const { saveNewUser } = require('../db/helpers/users');
const usersRouter = express.Router();

usersRouter.get('/login/:googleId', (req, res) => {
  const { googleId } = req.params;

  //query to get userId from googleId for queries throughout the app
  //userId should be added to global context
  //requests should be made with this, not with the googleId

  

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
      debugger;
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      debugger;
      res.sendStatus(404);
    });
});

module.exports = usersRouter;