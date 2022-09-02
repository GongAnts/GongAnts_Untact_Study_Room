require('dotenv').config();
const express = require('express');
const app = express();
const socketio = require('socket.io');
const httpServer = require('http').createServer(app);
const socketadmin = require('@socket.io/admin-ui');
const CLIENT_HOST = process.env.CLIENT_HOST || 'localhost';
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 4000;
const cors = require('cors');
const bcrypt = require('bcrypt');

// admin-socket.io
const wsServer = new socketio.Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
});

socketadmin.instrument(wsServer, {
  auth: false, // pw
});

// routing
const signupRouter = require('./routes/signup');
const scheduleRouter = require('./routes/schedule');
const studytimeRouter = require('./routes/studytime');
const todoRouter = require('./routes/todo');

// db setting
const main_db = require('./config/db');
const session_db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SESSION_DATABASE,
};

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
app.use(express.static('public'));
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function publicRooms() {
  // const sids = wsServer.sockets.adapter.sids;
  // const rooms = wsServer.sockets.adapter.rooms;

  console.log(wsServer.sockets.adapter.rooms);
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    // key 가 있으면 public room
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}
wsServer.on('connection', (socket) => {
  // console.log(wsServer.sockets.adapter);
  socket.on('join_room', (roomName, done) => {
    socket.join(roomName);
    socket.to(roomName).emit('welcome');
  });

  socket.on('offer', (offer, roomName) => {
    socket.to(roomName).emit('offer', offer);
  });

  socket.on('answer', (answer, roomName) => {
    socket.to(roomName).emit('answer', answer);
  });
  socket.on('ice', (ice, roomName) => {
    socket.to(roomName).emit('ice', ice);
  });
});

app.use(
  session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new MySQLStore(session_db),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

// passport setting
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log('serializeUser', user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log('deserializeUser', user);
  done(null, user);
});

// Local Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'user_id',
      passwordField: 'user_password',
    },
    function (userid, password, done) {
      console.log('LocalStrategy', userid, password);

      const sql1 = `SELECT * FROM user WHERE user_id = 'u${userid}'`;
      main_db.query(sql1, (err, data) => {
        if (!err) {
          // user_name 미존재
          if (data[0] === undefined) {
            console.log('계정이 존재하지 않습니다.');
            return done(null, false, { error: 'User name Not Found' });
          } else {
            const returnPassword = data[0].user_hash; // 아이디 존재 여부 확인해서 가져온 hash
            bcrypt.compare(password, returnPassword, (err, result) => {
              if (result) {
                var json = JSON.stringify(data[0]);
                var userdata = JSON.parse(json);
                userdata['user_google'] = false;
                return done(null, userdata);
              } else {
                console.log('비밀번호가 일치하지 않습니다.');
                return done(null, false, { error: 'User password Incorrect' });
              }
            });
          }
        } else {
          return done(err);
        }
      });
    },
  ),
);

// Google AOuth Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URIS,
    },
    function (accessToken, refreshToken, profile, cb) {
      const userdata = {
        user_id: 'g' + profile.id,
        user_name: profile.displayName,
        user_email: profile.emails[0].value,
        user_google: true,
      };
      try {
        const sql1 = `SELECT COUNT(*) AS result FROM user WHERE user_email = '${profile.emails[0].value}'`;
        main_db.query(sql1, (err, data) => {
          if (!err) {
            // 동일 user_email 존재
            if (data[0].result > 0) {
              console.log('이미 존재하는 user_email 입니다.');
              return cb(null, userdata);
            } else {
              const sql2 = `INSERT INTO user(user_id, user_type, user_name, user_email) VALUES('g${profile.id}', 'google', '${profile.displayName}', '${profile.emails[0].value}')`;
              main_db.query(sql2, (err, data) => {
                if (!err) {
                  console.log('DB 저장 성공');
                  return cb(null, userdata);
                } else {
                  console.log('DB 저장 실패');
                  return cb(err);
                }
              });
            }
          }
        });
      } catch (error) {
        return cb(error);
      }
    },
  ),
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
  }),
);

app.get(
  '/auth/google/callback',
  (profile = passport.authenticate('google', {
    failureRedirect: '/auth/google',
  })),
  function (req, res) {
    res.redirect(`http://${CLIENT_HOST}:${CLIENT_PORT}`);
  },
);

app.get('/auth', (req, res) => {
  if (req.isAuthenticated()) return res.status(200).send(req.user);
  res.status(401).send({ msg: 'logout' });
});

app.get('/auth/signout', (req, res) => {
  console.log('현재 사용자를 로그아웃 합니다.');
  req.logout();
  res.redirect('/auth');
});

app.post(
  '/auth/signin',
  passport.authenticate('local', {
    failureFlash: true,
  }),
  function (req, res) {
    req.session.user = req.user;
    req.session.save();
    console.log('session store..', req.user);
    // res.redirect('/auth');
  },
);

app.use('/auth/signup', signupRouter);
app.use('/schedule', scheduleRouter);
app.use('/studytime', studytimeRouter);
app.use('/todo', todoRouter);

httpServer.listen(SERVER_PORT, () => {
  console.log(`Server On : http://${SERVER_HOST}:${SERVER_PORT}/`);
});
