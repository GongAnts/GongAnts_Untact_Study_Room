const LocalStrategy = require('passport-local').Strategy;
const dao = require('../../dao/auth');
const bcrypt = require('bcrypt');

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
          return done(err);
        } else {
          if (data === undefined) {
            console.log('계정이 존재하지 않습니다.');
            return done(null, false, { error: '계정이 존재하지 않습니다.' });
          } else {
            // user_password 일치 확인
            const json = JSON.stringify(data);
            const userdata = JSON.parse(json);

            bcrypt.compare(password, userdata['user_hash'], (err, result) => {
              if (result) {
                return done(null, data);
              } else {
                console.log('비밀번호가 일치하지 않습니다.');
                return done(null, false, {
                  error: '비밀번호가 일치하지 않습니다.',
                });
              }
            });
          }
        }
      },
    );
  },
);
