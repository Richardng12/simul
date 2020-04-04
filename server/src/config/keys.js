// add this file to gitignore

module.exports = {
  spotify: {
    clientID: process.env.client_id,
    clientSecret: process.env.client_secret,
  },
  mongodb: {
    dbURI: process.env.mongo_db_uri,
  },
  session: {
    cookieKey: process.env.cookie_key,
  },
};
