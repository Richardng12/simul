const app = require('./app');
const db = require('./src/db');
const path = require('path');

const port = process.env.PORT || 8080;

db.connect().then(()=>{
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
});