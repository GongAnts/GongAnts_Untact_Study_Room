const LocalStrategy = require('passport-local').Strategy;
const dao = require('../../dao/auth');
const bcrypt = require('bcrypt');
const logger =
  process.env.NODE_ENV === 'production'
    ? require('../productionLogger')
    : require('..//devLogger');

// Local Passport 정의
module.exports = new LocalStrategy(
  {
    usernameField: 'user_id',
    passwordField: 'user_password',
  },
  function (userid, password, done) {
    // user_id 존재 확인
    dao.getAuthDao(
      { id: 'u' + userid, password: password },
      function (err, data) {
        if (err) {
          logger.error(`[localLogin] ${err}`);
          return done(err);
        } else {
          if (data === undefined) {
            logger.error('[localLogin] 계정이 존재하지 않습니다.');
            return done(null, false);
          } else {
            // user_password 일치 확인
            const json = JSON.stringify(data);
            const userdata = JSON.parse(json);

            bcrypt.compare(password, userdata['user_hash'], (err, result) => {
              if (result) {
                return done(null, data);
              } else {
                logger.error('[localLogin] 비밀번호가 일치하지 않습니다.');
                return done(null, false);
              }
            });
          }
        }
      },
    );
  },
);
