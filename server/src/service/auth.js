require('dotenv').config();
const dao = require('../dao/auth');
const bcrypt = require('bcrypt');

// 회원가입
const postSignupService = async (dto, callback) => {
  const saltRounds = 10;
  dao.getSignupIdDao(dto, function (err, data) {
    if (err) {
      return callback(err);
    } else {
      // 동일 user_id 존재
      if (data.result > 0) {
        return callback(err, 'Incorrect user_id');
      }
      dao.getSignupEmailDao(dto, function (err, data) {
        if (err) {
          return callback(err);
        } else {
          // 동일 user_email 존재
          if (data.result > 0) {
            return callback(err, 'Incorrect user_email');
          }
          bcrypt.hash(dto.password, saltRounds, (err, hash) => {
            if (!err) {
              dto.hash = hash;
              dao.postSignupDao(dto, function (err, data) {
                return callback(null, dto);
              });
            } else {
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
