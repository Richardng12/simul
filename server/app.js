const express = require('express');
const passport = require('passport');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
const swaggerUi = require('swagger-ui-express');
const keys = require('./src/config/keys');
const authRoutes = require('./src/routes/authRoutes');
<<<<<<< HEAD
const lobbyRoutes = require('./src/routes/lobbyRoutes');
const User = require('./src/db/models/userModel');
=======
const routes = require('./src/routes/routes');

const swaggerDocument = require('./swagger');
>>>>>>> master

require('./src/config/passportSetup');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
  return null;
}

// connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// configure Express
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    keys: [keys.session.cookieKey],
  }),
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', consolidate.swig);

// set-up auth routes
app.use('/auth', authRoutes);
app.use(routes);

app.use('/lobbies', lobbyRoutes);

// home route
app.get('/', (req, res) => {
  res.render('index.html', { user: req.user });
});

// account route
app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account.html', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login.html', { user: req.user });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = app;
