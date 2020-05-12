const app = require('./app');

const port = 8888;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}!`);
});
