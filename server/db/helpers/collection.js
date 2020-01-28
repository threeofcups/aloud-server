const { db } = require('../../db/pg-adaptor');

const saveCollection = (collectionBody) => {
  // insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) values('1', 'io sonnets', 'recordings of original Galilean moon sonnets', '0', 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Io_highest_resolution_true_color.jpg', now());
  
  const {
    id_user_creator,
    title, 
    description,
    url_image,
  } = collectionBody;

  const insertCollection = `INSERT INTO collections(id_user_creator, title, description, count_recordings, url_image, created_at) VALUES('${id_user_creator}', '${title}', '${description}', '0', '${url_image}', now())`;
  return db.query(insertCollection);
};
 
//get all recordings info that belong to a collection
const getCollectionRecordings = (collectionId) => {
  const joinSQL = `SELECT * FROM collections_recordings JOIN recordings as r ON id_recording = r.id WHERE id_collection = ${collectionId}`;
  return db.query(joinSQL);
}

module.exports.saveCollection = saveCollection;
module.exports.getCollectionRecordings = getCollectionRecordings;