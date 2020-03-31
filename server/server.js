const app = require('./app');
const db = require('./src/db');
const path = require('path');

const port = 8888;

db.connect().then(()=>{
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
});