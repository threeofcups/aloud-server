const { query } = require('../../db/pg-adaptor');

const getHomeCollections = () => {
  return query();
};

const getHomeRecordings = () => {
  const recordingSQL = 'select * from recordings'
  return query(recordingSQL);

};

module.exports.getHomeCollections = getHomeCollections;
module.exports.getHomeRecordings = getHomeRecordings;
