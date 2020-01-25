const { db } = require('../../db/pg-adaptor');

const stageLibraryContent = async (userId) => {

  // const creatorCollectionUsername = `SELECT u.username FROM users WHERE u.id IN ($ids)`
  // const collectionSQL = `SELECT usc.id_user, usc.id_collection, usc.created_at, c.id_user_creator, c.title, c.description, c.url_image, c.count_recordings, u.username FROM users_saved_collections as usc JOIN users as u ON u.id = usc.id_user JOIN collections as c ON c.id = usc.id_collection WHERE usc.id_user = ${userId}`;
  // const recordingSQL = `SELECT usr.id_user, usr.id_recording, usr.created_at, r.title, r.description, r.url_recording, r.speech_to_text, r.created_at, r.id_user, u.username FROM users_saved_recordings as usr JOIN users as u ON u.id = usr.id_user JOIN recordings as r ON r.id = usr.id_recording WHERE usr.id_user = ${userId} AND r.published = 'public'`;

  // get all user’s saved collection ids first
  // save as variable
  // then get all the info from those collections
  // same w recordings
  
  
  const assignContentIds = async(userId) => {
    const collectionSQL = `SELECT id_collection FROM users_saved_collections WHERE id_user = ${userId}`;
    const recordingSQL = `SELECT id_recording FROM users_saved_recordings WHERE id_user = ${userId}`;
    const ids = {
      collectionIds: await db.query(collectionSQL),
      recordingIds: await db.query(recordingSQL)
    };

    return ids;
  };

  const stageContent = async(ids, userId) => {
    const collectionSQL = `SELECT *, u.username FROM collections JOIN users AS u ON u.id = id_user_creator WHERE id_user_creator != ${userId}`;
    const recordingSQL = `SELECT *, u.username FROM recordings JOIN users AS u ON u.id = id_user WHERE id_user != ${userId}`;

    const content = {
      collections: await db.query(collectionSQL),
      recordings: await db.query(recordingSQL)
    }

    return content;
  };

  return assignContentIds(userId)
  .then(ids => {
    return stageContent(ids, userId);
  })
  .catch(err => {
    debugger;
  })

};

const getAllLibraryContent = (userId) => {
  const content = stageLibraryContent(userId);
  return content;
};

module.exports.getAllLibraryContent = getAllLibraryContent;