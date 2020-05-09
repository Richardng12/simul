const server = require('./app');

const port = 8888;

server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
