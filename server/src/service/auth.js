require('dotenv').config();
const dao = require('../dao/auth');
const bcrypt = require('bcrypt');
const logger =
  process.env.NODE_ENV === 'production'
    ? require('../config/productionLogger')
    : require('../config/devLogger');

// 회원가입
const postSignupService = async (dto, callback) => {
  const saltRounds = 10;
  dao.getSignupIdDao(dto, function (err, data) {
    if (err) {
      logger.error(`[postSignup] ${err}`);
      return callback(err);
    } else {
      // 동일 user_id 존재
      if (data.result > 0) {
        logger.error(`[postSignup] Incorrect user_id`);
        return callback(err, 'Incorrect user_id');
      }
      dao.getSignupEmailDao(dto, function (err, data) {
        if (err) {
          logger.error(`[postSignup] ${err}`);
          return callback(err);
        } else {
          // 동일 user_email 존재
          if (data.result > 0) {
            logger.error(`[postSignup] Incorecct user_email`);
            return callback(err, 'Incorrect user_email');
          }
          bcrypt.hash(dto.password, saltRounds, (err, hash) => {
            if (!err) {
              dto.hash = hash;
              dao.postSignupDao(dto, function (err, data) {
                return callback(null, dto);
              });
            } else {
              logger.error(`[postSignup] ${err}`);
              return callback(err);
            }
          });
        }
      });
    }
  });
};

module.exports = {
  postSignupService,
};
