const { db } = require('../../db/pg-adaptor');

const stageLibraryContent = async (userId) => {
  
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
    const collectionSQL = `SELECT c.id, title, description, count_recordings, c.url_image, c.created_at, u.username FROM collections as c JOIN users AS u ON u.id = id_user_creator WHERE id_user_creator != ${userId}`;
    const recordingSQL = `SELECT r.id, title, description, url_recording, speech_to_text, r.created_at, u.username FROM recordings as r JOIN users AS u ON u.id = id_user WHERE id_user != ${userId}`;

    const content = [{
      collections: await db.query(collectionSQL),
      recordings: await db.query(recordingSQL)
    }]

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

//query to save a recording to a library (users_saved)
//query to save a collection to a library (users_saved)

module.exports.getAllLibraryContent = getAllLibraryContent;