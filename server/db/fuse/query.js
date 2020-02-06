const { db } = require('../pg-adaptor');
const Fuse = require('fuse.js');
const { getAllUsers } = require('../helpers/users');
const { retrieveRecordingObjects } = require('../helpers/recording');
const { retrieveCollectionObjects } = require('../helpers/collection');

const stageRecordingData = async() => {
  return await retrieveRecordingObjects()
};

const stageCollectionData = async () => {
  return await retrieveCollectionObjects()
};

const recordingFuser = async() => {
  const recordings = await stageRecordingData();
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

const collectionFuser = async () => {
  const collections = await stageCollectionData();
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
      "description",
      "name",
      "username"
    ]
  }

  const fuse = new Fuse(collections, options);
  return fuse;
};

module.exports.recordingFuser = recordingFuser;
module.exports.collectionFuser = collectionFuser;