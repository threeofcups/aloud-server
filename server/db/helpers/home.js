const { db } = require('../../db/pg-adaptor');


const getHomeCollections = () => {
  const collectionSQL = `SELECT collections.id, username, name_display, title, description, count_recordings, collections.url_image, created_at FROM collections JOIN users ON users.id = collections.id_user_creator`;
  return db.query(collectionSQL);
};

const getHomeRecordings = () => {
  const recordingSQL = `SELECT recordings.id, username, name_display, title, description, url_recording, speech_to_text, created_at FROM recordings JOIN users ON users.id = recordings.id_user WHERE published = 'public'`;
  return db.query(recordingSQL);
};

//recently played query function (will need schema additions)
//home will not need posts

module.exports.getHomeCollections = getHomeCollections;
module.exports.getHomeRecordings = getHomeRecordings;
