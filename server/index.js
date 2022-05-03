const express = require('express');
const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const bcrypt = require('bcrypt');

// routing
const signupRouter = require('./routes/signup');
const scheduleRouter = require('./routes/schedule');
const memoRouter = require('./routes/memo');
const studytimeRouter = require('./routes/studytime');
const todoRouter = require('./routes/todo');

// session setting
const db = require('./config/db');
const session_db = require('./config/session_db.json');
const googleCredentials = require('./config/google.json');
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

var options = {
  host: session_db.db.host,
  port: session_db.db.port,
  user: session_db.db.user,
  password: session_db.db.password,
  database: session_db.db.database,
};

app.use(
  session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new MySQLStore(options),
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
      db.query(sql1, (err, data) => {
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
      clientID: googleCredentials.web.client_id,
      clientSecret: googleCredentials.web.client_secret,
      callbackURL: googleCredentials.web.redirect_uris[0],
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
        db.query(sql1, (err, data) => {
          if (!err) {
            // 동일 user_email 존재
            if (data[0].result > 0) {
              console.log('이미 존재하는 user_email 입니다.');
              return cb(null, userdata);
            } else {
              const sql2 = `INSERT INTO user(user_id, user_type, user_name, user_email) VALUES('g${profile.id}', 'google', '${profile.displayName}', '${profile.emails[0].value}')`;
              db.query(sql2, (err, data) => {
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
    res.redirect(`http://${HOST}:${PORT}/auth`);
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
    res.redirect('/auth');
  },
);

app.use('/auth/signup', signupRouter);
app.use('/schedule', scheduleRouter);
app.use('/memo', memoRouter);
app.use('/studytime', studytimeRouter);
app.use('/todo', todoRouter);

app.listen(PORT, () => {
  console.log(`Server On : http://${HOST}:${PORT}/`);
});
