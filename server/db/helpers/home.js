const { db } = require('../../db/pg-adaptor');


const getHomeCollections = (userId) => {
  const collectionSQL = `SELECT collections.id, username, name, title, description, count_recordings, collections.url_image, created_at FROM collections JOIN users ON users.id = collections.id_user_creator WHERE collections.id_user_creator != ${userId}`;
  return db.query(collectionSQL);
};

const getHomeRecordings = (userId) => {
  const recordingSQL = `SELECT recordings.id, username, name, title, description, url_recording, speech_to_text, created_at FROM recordings JOIN users ON users.id = recordings.id_user WHERE published = 'public' AND recordings.id_user != ${userId}`;
  return db.query(recordingSQL);
};

//recently played query function (will need schema additions)
//home will not need posts

module.exports.getHomeCollections = getHomeCollections;
module.exports.getHomeRecordings = getHomeRecordings;
