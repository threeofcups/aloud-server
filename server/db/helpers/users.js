const {db} = require('../../db/pg-adaptor');

const saveNewUser = (userObject) => {
  const { id, name, email, familyName, givenName, photoUrl } = userObject;
  const username = email.replace('@gmail.com', '');
  debugger;
  //default bio
  const bio = ' ';

  const insertUser = `INSERT INTO users(id_google, email, name_family, name_first, name, username, url_image, bio) VALUES('${id}', '${email}', '${familyName}', '${givenName}', '${name}', '${username}', '${photoUrl}', '${bio}')`;
  return db.query(insertUser);
};

//will need a patch user for profile page
//image, bio, name, username

module.exports.saveNewUser = saveNewUser;