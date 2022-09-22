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

// 친구 상태 조회
const getFriendStateDao = (dto, callback) => {
  db.query(
    `
    SELECT state FROM friendrequest WHERE send_email = ? AND receive_email = ?
    `,
    [dto.userEmail, dto.friendEmail],
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

// 친구 요청 조회
const getFriendRequestDao = (dto, callback) => {
  db.query(
    `
    SELECT u.user_email, u.user_name FROM user u \
    INNER JOIN friendrequest f ON u.user_email = f.send_email \
    WHERE f.receive_email = ? AND state = 0
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

// 친구 요청 보내기
const postFriendRequestDao = (dto, callback) => {
  db.query(
    `
    INSERT INTO friendrequest(send_email, receive_email) VALUES(?, ?)
    `,
    [dto.userEmail, dto.friendEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 친구 수락
const putFriendRequestDao = (dto, callback) => {
  db.query(
    `
    UPDATE friendrequest SET state = ? WHERE send_email = ? AND receive_email = ?
    `,
    [dto.state, dto.friendEmail, dto.userEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 친구 수락시 친구 추가
const postFriendDao = (dto, callback) => {
  db.query(
    `
    INSERT INTO friend(user_email, friend_email) VALUES(?, ?)
    `,
    [dto.friendEmail, dto.userEmail, dto.userEmail, dto.friendEmail],
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
  getFriendStateDao,
  getSearchFriendDao,
  getFriendListDao,
  getFriendRequestDao,
  postFriendRequestDao,
  putFriendRequestDao,
  postFriendDao,
};
