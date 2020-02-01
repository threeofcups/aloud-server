const { db } = require('../pg-adaptor');
const Fuse = require('fuse.js');
const { getAllUsers } = require('../helpers/users');
const { retrieveRecordingObjects } = require('../helpers/recording');
const { retrieveCollectionObjects } = require('../helpers/collection');

const stageQueryData = async() => {
  return await retrieveRecordingObjects()
};

const fuser = async() => {
  const recordings = await stageQueryData();
  const options = {
    shouldSort: true,
    includeScore: true,
    includeMatches: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
      "title",
      "description"
    ]
  }

  const fuse = new Fuse(recordings, options);
  return fuse;
};

module.exports.stageQueryData = stageQueryData;
module.exports.fuser = fuser;