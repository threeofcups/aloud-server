const {db} = require('../../db/pg-adaptor');


  //query to get userId from googleId for queries throughout the app
  //userId should be added to global context
  //requests should be made with this, not with the googleId
const getUserId = (googleId) => {
  const googSQL = `SELECT id FROM users WHERE id_google = '${googleId}'`;
  return db.query(googSQL);
};

const saveNewUser = (userObject) => {
  const { id, name, email, familyName, givenName, photoUrl } = userObject;
  const username = email.replace('@gmail.com', '');
  //default bio
  const bio = ' ';

  const insertUser = `INSERT INTO users(id_google, email, name_family, name_first, name, username, url_image, bio) VALUES('${id}', '${email}', '${familyName}', '${givenName}', '${name}', '${username}', '${photoUrl}', '${bio}')`;
  return db.query(insertUser);
};

//will need a patch user for profile page
//image, bio, name, username

module.exports.saveNewUser = saveNewUser;
module.exports.getUserId = getUserId;