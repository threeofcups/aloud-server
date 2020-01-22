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
const homeRouter = require('./routes/home');
const apiRouter = require('./routes/api');
const libRouter = require('./routes/library');
const proRouter = require('./routes/profile');
const recRouter = require('./routes/recording');

const app = express();
const CLIENT_PATH = path.join(__dirname, '../client/dist/');

app.use(express.json({ extended: false }));
app.use(express.static(CLIENT_PATH));


app.use('/home', homeRouter);
app.use('/', apiRouter);
app.use('/profile', proRouter);
app.use('/recording', recRouter);
app.use('/library', libRouter);

//visualizer instance
app.use(
  '/routes',
  middleware({ httpMethods: true }),
  visualizer({ theme: 'burn' })
)

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

type Query {
  hello: String
  recordings: [Recording!]!
  recording(id: ID!): Recording
  description: String!
}

type Mutation {
  createDraft(
    title: String!,
    content: String
    ): Recording

  updateRecording(
    id: ID!
    title: String!
    content: String!
    published: Boolean!
  ) : Recording

  deleteRecording(
    id: ID!
    ): Recording

  publishRecording(
    id: ID!
    ): Recording
}

type Recording {
  id: ID!
  title: String!
  content: String!
  published: Boolean!
}
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

//app.get('/', (req, res) => res.send('hello world'));
app.listen(PORT, () => {
  console.log(`Express app is listening on port ${PORT}!🛸`)
  console.log('Running a GraphQL API server at http://localhost:3000/graphql');
});
