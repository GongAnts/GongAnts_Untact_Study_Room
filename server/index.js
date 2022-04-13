const express = require('express');
const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const bcrypt = require('bcrypt');

// routing
const signupRouter = require('./routes/signup');
const calendarRouter = require('./routes/calendar');
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

passport.deserializeUser(function (id, done) {
  console.log('deserializeUser id : ', id);
  done(null, id);
});

// Local Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'user_name',
      passwordField: 'user_password',
    },
    function (username, password, done) {
      console.log('LocalStrategy', username, password);

      const sql1 = `SELECT user_hash FROM user WHERE user_name = '${username}'`;
      db.query(sql1, (err, data) => {
        if (!err) {
          // 동일한 name 존재 X
          const returnPassword = data[0].user_hash; // 아이디 존재 여부 확인해서 가져온 hash
          if (returnPassword === undefined) {
            console.log('계정이 존재하지 않습니다.');
            return done(null, false, { msg1: 'User_name not found.' });
          } else {
            bcrypt.compare(password, returnPassword, (err, result) => {
              console.log(returnPassword);
              if (result){
                  var json = JSON.stringify(data[0]);
                  var userdata = JSON.parse(json);
                  userdata['user_google'] = false;
                  return done(null, userdata);
              } else {
                  console.log('비밀번호가 일치하지 않습니다.');
                  return done(null, false, { msg2: 'User data incorrect.' });
              }
            })
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
    function (accessToken, refreshToken, profile, done) {
      console.log('GoogleStrategy', accessToken, refreshToken, profile);
      console.log('Email_info', profile.emails[0].value);
      var userdata = {
        user_id: profile.id,
        user_name: profile.displayName,
        user_email: profile.emails[0].value,
        user_google: true,
      };
      done(null, userdata);
    },
  ),
);  

/**
 * @api {get} /auth Request SignIn Information
 *
 * @apiVersion 1.0.0
 * @apiName 로그인 정보
 * @apiGroup Auth
 * @apiDescription 로그인 여부를 확인합니다.
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} user_hash 사용자 비밀번호 해시값
 * @apiSuccess {String} user_google 소셜 로그인 여부
 * @apiSuccess {String} lastname  Lastname of the User.
 */


 app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
  }),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
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
    failureRedirect: '/auth',
  }),
  function (req, res) {
    req.session.user = req.user;
    req.session.save();
    console.log('session store..', req.user);
    res.redirect('/auth');
  },
);

app.use('/auth/signup', signupRouter);
app.use('/calendar', calendarRouter);
app.use('/memo', memoRouter);
app.use('/studytime', studytimeRouter);
app.use('/todo', todoRouter);

app.listen(PORT, () => {
  console.log(`Server On : http://${HOST}:${PORT}/`);
});
