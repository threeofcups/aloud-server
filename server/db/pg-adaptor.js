require('dotenv').config()
const pgPromise = require('pg-promise');
const promisify = require('util.promisify');

const pgp = pgPromise({}); // Empty object means no additional config required
const db_user = process.env.POSTGRES_USER || 'postgres';
const db_password = process.env.POSTGRES_PASSWORD || 'postgres';
const db_name = process.env.POSTGRES_DB || 'localhost_aloud';
// const db_host =  'localhost';
const db_host = '34.68.233.89' || `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}` || 'localhost';

const config = {
  user: db_user,
  password: db_password,
  database: db_name,
  host: db_host,
};

const db = pgp(config);
const query = promisify(db.query).bind(db);

query('select * from users;').then(console.log(`Connected to ${db_name} db`));

exports.db = db;