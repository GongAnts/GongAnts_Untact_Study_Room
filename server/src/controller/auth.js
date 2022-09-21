require('dotenv').config();
const statusCode = require('../constant/statusCode');
const service = require('../service/auth');
const passport = require('../config/passport/passport');

// 로그인 상태 확인
const getAuthController = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(statusCode.OK).send(req.user);
  } else {
    res.status(statusCode.UNAUTHORIZED).send({ msg: 'logout' });
  }
};

// 로그아웃
const getAuthSignoutController = (req, res) => {
  req.logout();
  res.redirect('/auth');
};

// 로컬 로그인
const postLocalSigninController = (req, res) => {
  req.session.user = req.user;
  req.session.save();
  console.log('session store..', req.user);
  res.status(statusCode.OK).send(req.session.user);
};

// 구글 로그인
const postGoogleSigninController = (req, res) => {
  res.redirect(`http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`);
};

// 회원가입
const postSignupController = (req, res) => {
  const dto = {
    id: 'u' + req.body.user_id,
    type: 'local',
    name: req.body.user_name,
    email: req.body.user_email,
    hash: null,
    password: req.body.user_password,
  };
  if (!dto.id || !dto.name || !dto.email || !dto.password) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.postSignupService(dto, (err, data) => {
    if (err) {
      if (data) {
        res.status(statusCode.BAD_REQUEST).send(data);
      } else {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
      }
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

module.exports = {
  getAuthController,
  getAuthSignoutController,
  postLocalSigninController,
  postGoogleSigninController,
  postSignupController,
};
