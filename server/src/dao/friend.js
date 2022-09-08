const db = require('../config/db');

// 친구 검색
const getSearchFriendDao = (dto, callback) => {
  db.query(
    `
    SELECT * FROM user WHERE user_email = ?
    `,
    [dto.friendEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows[0]);
      }
    },
  );
};

// 친구 리스트 조회
const getFriendListDao = (dto, callback) => {
  db.query(
    `
    SELECT u.user_email, u.user_name FROM user u \
    INNER JOIN friend f ON u.user_email = f.friend_email \
    WHERE f.user_email = ?
    `,
    [dto.userEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

module.exports = {
  getSearchFriendDao,
  getFriendListDao,
};
