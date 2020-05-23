/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
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
const routes = require('./src/routes/routes');
const lobbyRoutes = require('./src/routes/lobbyRoutes');
const swaggerDocument = require('./swagger');

require('./src/config/passportSetup');

const app = express();

// eslint-disable-next-line import/order
const server = require('http').createServer(app);
// eslint-disable-next-line import/order
const io = require('socket.io')(server);
const Chat = require('./src/db/models/chatModel');

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
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(keys.mongodbtest.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} else {
  const connect = mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // connect to socket io connection on frontend
  io.on('connection', socket => {
    // when message is receive from backend
    console.log(`${socket.client.conn.server.clientsCount} users connected`);
    socket.on('Input Chat Message', msg => {
      connect.then(() => {
        try {
          const chat = new Chat({
            message: msg.chatMessage,
            lobbyId: msg.lobbyId,
            sender: msg.userId,
            type: msg.type,
          });
          // eslint-disable-next-line consistent-return
          // save chat msg to db
          chat.save((err, doc) => {
            if (err) {
              console.log(err);
            }
            // find that particular id, and the sender's info who sent it
            Chat.find({ _id: doc._id })
              .populate('sender')
              .exec((err, doc) => {
                // send message back to frontend
                console.log(doc);
                return io.emit('Output Chat Message', doc);
              });
          });
        } catch (error) {
          console.error(error);
        }
      });
    });

    // will be called once a user joins a lobby
    socket.on('onLobbyJoin', lobbyId => {
      socket.join(lobbyId);
      console.log('user has joined lobby');
      io.sockets.in(lobbyId).emit('joinMessage', `${lobbyId} has joined global room`);
    });

    socket.on('addToQueue', id => {
      console.log('added to queue gets called');
      io.sockets.in(id).emit('updateQueue');
    });
    // will be called when a song has been queued, need to tell everyone to play song, need to also keep track of timestamp somehow...
    socket.on('playMusic', id => {
      io.in(id).clients((err, clients) => {
        // clients will be array of socket ids , currently available in given room
        console.log(clients);
      });

      console.log(id);
      io.sockets.in(id).emit('sendMessageToPlay');
    });

    io.sockets.on('disconnect', () => {
      // handle disconnect
      console.log('left the room');
      io.sockets.disconnect();
      io.sockets.close();
    });
  });
}

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
module.exports = server;
