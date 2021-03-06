const { db } = require('../../db/pg-adaptor');

//can be used for logged in user and 'go to artist' profile grab
const getAllProfileContent = async (userId) => {
  const usersContentSQL = `SELECT id, username, email, name, bio, url_image FROM users WHERE id = ${userId}`;
  const collectionSQL = `SELECT collections.id, username, name, title, description, count_recordings, collections.url_image, created_at FROM collections JOIN users ON users.id = collections.id_user_creator WHERE collections.id_user_creator = ${userId}`;
  const recordingSQL = `SELECT recordings.id, username, name, title, description, url_recording, speech_to_text, created_at FROM recordings JOIN users ON users.id = recordings.id_user WHERE published = 'public' AND recordings.id_user = ${userId}`;
  
  const content = [{
    user: await db.query(usersContentSQL),
    collections: await db.query(collectionSQL),
    recordings: await db.query(recordingSQL)
  }];

  return content;
};

//create/patch profile content
//on sign-up or profile editing

module.exports.getAllProfileContent = getAllProfileContent;