module.exports = (app) => {
  var passport = require('passport');

  var localLogin = require('./localLogin');
  var googleLogin = require('./googleLogin');

  app.use(passport.initialize());
  app.use(passport.session());

  // 사용자 인증 성공 시 호출
  passport.serializeUser(function (user, done) {
    console.log('serializeUser', user);
    done(null, user);
  });

  // 사용자 인증 이후, 요청할 때마다 호출
  passport.deserializeUser(function (user, done) {
    console.log('deserializeUser', user);
    done(null, user);
  });

  passport.use('local', localLogin);
  passport.use('google', googleLogin);

  return passport;
};
