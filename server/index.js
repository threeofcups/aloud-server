const express = require('express');
const https = require('https');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const { buildSchema } = require('graphql');
const db = require('./db/pg-adaptor');

const PORT = process.env.PORT || 3000;
//route visualizer
const { middleware, visualizer } = require('express-routes-visualizer');

//routes
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const homeRouter = require('./routes/home');
const libraryRouter = require('./routes/library');
const profileRouter = require('./routes/profile');
const recordingRouter = require('./routes/recording');
const collectionRouter = require('./routes/collection');
const queryRouter = require('./routes/query');

const app = express();
const CLIENT_PATH = path.join(__dirname, '../client/dist/');

app.use(express.json({ extended: false }));
app.use(express.static(CLIENT_PATH));


app.use('/', mainRouter);
app.use('/user', usersRouter);
app.use('/home', homeRouter);
app.use('/profile', profileRouter);
app.use('/recording', recordingRouter);
app.use('/collection', collectionRouter);
app.use('/library', libraryRouter);
app.use('/query', queryRouter);

//visualizer instance
app.use(
  '/routes',
  middleware({ httpMethods: true }),
  visualizer({ theme: 'burn' })
)

//app.get('/', (req, res) => res.send('hello world'));
app.listen(PORT, () => {
  console.log(`Express app is listening on port ${PORT}!🛸`)
  console.log('Running server at http://localhost:3000');
});
