const {query} = require('../../db/pg-adaptor');

const getAllUsers = () => {
  return query('select * from users;').then(console.log(`
  1. working database collection
  2. working query export called from main route
  `));
};

module.exports.getAllUsers = getAllUsers;