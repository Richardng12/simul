const server = require('./app');

const port = 8888;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}!`);
});
