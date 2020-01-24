const { db } = require('../../db/pg-adaptor');


const getHomeCollections = () => {
  // return query();
};

const getHomeRecordings = () => {
  const recordingSQL = `SELECT recordings.id, username, name_display, title, description, url_recording, speech_to_text, created_at FROM recordings INNER JOIN users ON users.id = recordings.id_user WHERE published = 'public'`;
  return db.query(recordingSQL);
};

module.exports.getHomeCollections = getHomeCollections;
module.exports.getHomeRecordings = getHomeRecordings;
