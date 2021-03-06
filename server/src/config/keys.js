// add this file to gitignore
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  spotify: {
    clientID: process.env.client_id,
    clientSecret: process.env.client_secret,
  },
  mongodb: {
    dbURI: process.env.mongo_db_uri,
  },
  mongodbtest: {
    dbURI: process.env.mongotest_db_uri,
  },
  session: {
    cookieKey: process.env.cookie_key,
  },
};
