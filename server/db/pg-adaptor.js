require('dotenv').config()
const pgPromise = require('pg-promise');
const promisify = require('util.promisify');

const pgp = pgPromise({}); // Empty object means no additional config required
const db_user = process.env.POSTGRES_USER || 'postgres';
const db_password = process.env.POSTGRES_PASSWORD || 'postgres';
const db_name = process.env.POSTGRES_DB || 'aloud_local';
const db_host = process.env.POSTGRES_HOST || 'localhost';

const config = {
  user: db_user,
  password: db_password,
  database: db_name,
  host: db_host,
  socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
};

const db = pgp(config);
const query = promisify(db.query).bind(db);

db.connect().then(console.log(`connected to ${db_name}`));

module.exports.db = db;