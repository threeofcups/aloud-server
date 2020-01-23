// api routes requires
const express = require('express');
const { getAllUsers } = require('../db/helpers/users');


//rexpress router
const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
  res.send('make your request human');
  getAllUsers();
});

mainRouter.get('/login', (req, res) => {
  res.send('login');
});

mainRouter.get('/signup', (req, res) => {
  res.send('signup');
});

module.exports = mainRouter;