const express = require('express'),
  session = require('express-session'),
  passport = require('passport'),
  swig = require('swig');

const authRoutes = require('./src/routes/auth-routes');
const passportSetup = require('./src/config/passport-setup');
const consolidate = require('consolidate');

const mongoose = require('mongoose');
const keys = require('./src/config/keys');
const cookieSession = require('cookie-session');

const app = express();

//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //1 day in milliseconds
    keys: [keys.session.cookieKey],
  }),
);

// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

app.engine('html', consolidate.swig);

//set-up auth routes
app.use('/auth', authRoutes);

//home route
app.get('/', (req, res) => {
  res.render('index.html', { user: req.user });
});

//account route
app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account.html', { user: req.user });
});

//login route
app.get('/login', (req, res) => {
  res.render('login.html', { user: req.user });
});

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
}

module.exports = app;
