const express = require('express');
const router = express.Router();
const controller = require('../controller/auth');

module.exports = (passport) => {
  router.get('/', controller.getAuthController);
  router.get('/signout', controller.getAuthSignoutController);
  router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
    }),
  );
  router.get(
    '/google/callback',
    (profile = passport.authenticate('google', {
      failureRedirect: '/google',
    })),
    controller.postGoogleSigninController,
  );
  router.post(
    '/signin',
    passport.authenticate('local', {
      failureFlash: true,
      //   successFlash: true,
    }),
    controller.postLocalSigninController,
  );
  router.post('/signup', controller.postSignupController);
  return router;
};
