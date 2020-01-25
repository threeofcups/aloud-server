require('dotenv').config()
const pgPromise = require('pg-promise');
const promisify = require('util.promisify');

const pgp = pgPromise({}); // Empty object means no additional config required

const config = {
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'aloud',
  host: process.env.POSTGRES_HOST || 'localhost',
  socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
};

const db = pgp(config);
const query = promisify(db.query).bind(db);

query('select * from users;').then(console.log(`Connected to aloud db`));

exports.db = db;