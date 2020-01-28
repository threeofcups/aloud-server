const { db } = require('../../db/pg-adaptor');

const saveRecording = (recordingBody) => {
  // destructure body
  const {
    id_user,
    title,
    description,
    url_recording,
    published,
    speech_to_text
  } = recordingBody;

  // insert each value in recordings table
  // at now() for created_at & id field will be automatically generated 
  const insertRecording = `INSERT INTO recordings(id_user, title, description, url_recording, published, speech_to_text, created_at) VALUES('${id_user}', '${title}', '${description}', '${url_recording}', '${published}', '${speech_to_text}', now())`
  return db.query(insertRecording);

  // will also need to save to collection if collection was chosen at time of creation
};

const saveToCollection = (collectionId, recordingId) => {
  //will need a collectionId and a recordingId 
  //will post to collections_recording recordingId and collectionId
  const recordingToCollection = `INSERT INTO collections_recordings(id_collection, id_recording) VALUES('${collectionId}', '${recordingId}')`;
  return db.query(recordingToCollection);
}; 


module.exports.saveRecording = saveRecording;
module.exports.saveToCollection = saveToCollection;
