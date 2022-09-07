const db = require('../config/db');

// 전체 공부 시간 로드
const getTotalStudytimeDao = (dto, callback) => {
  db.query(
    `
    SELECT HOUR(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS hour,\
    MINUTE(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS minute,\
    SECOND(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS second\
    FROM studytime WHERE user_id = ?
    `,
    [dto.userId],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows[0]);
      }
    },
  );
};

// 전체 사용자 월별 공부 시간 로드
const getMonthlyAllStudytimeDao = (dto, callback) => {
  db.query(
    `
    SELECT HOUR(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS hour,\
    MINUTE(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS minute,\
    SECOND(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS second\
    FROM studytime WHERE DATE_FORMAT(create_date, '%Y-%c') = '?-?'
    `,
    [dto.year, dto.month],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows[0]);
      }
    },
  );
};

// 사용자별 월별 공부 시간 로드
const getMonthlyUserStudytimeDao = (dto, callback) => {
  db.query(
    `
    SELECT HOUR(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS hour,\
    MINUTE(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS minute,\
    SECOND(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS second\
    FROM studytime WHERE user_id = ? AND DATE_FORMAT(create_date, '%Y-%c') = '?-?'
    `,
    [dto.userId, dto.year, dto.month],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows[0]);
      }
    },
  );
};

// 월별 공부 시간 로드(캘린더 용)
const getMonthlyListUserStudytimeDao = (dto, callback) => {
  db.query(
    `
    SELECT YEAR(create_date) AS year,\
    MONTH(create_date) AS month,\
    DAY(create_date) AS day,\
    HOUR(studytime) AS hour,\
    MINUTE(studytime) AS minute,\
    SECOND(studytime) AS second\
    FROM studytime WHERE user_id = ? \
    AND DATE_FORMAT(create_date, '%Y-%c') = '?-?'
    `,
    [dto.userId, dto.year, dto.month],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 오늘 공부 시간 로드
const getTodayUserStudytimeDao = (dto, callback) => {
  db.query(
    `
    SELECT HOUR(studytime) AS hour,\
    MINUTE(studytime) AS minute,\
    SECOND(studytime) AS second\
    FROM studytime WHERE user_id = ?\
    AND DATE(create_date) = DATE(now())
    `,
    [dto.userId],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// POST
// 오늘 공부 시간 저장 여부 확인
const getCheckTodayUserStudytimeDao = (dto, callback) => {
  db.query(
    `
    SELECT * FROM studytime WHERE user_id = ?\
    AND DATE(create_date) = DATE(now())
    `,
    [dto.userId],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 오늘 공부 시간 생성
const postCreateTodayUserStudytimeDao = (dto, callback) => {
  db.query(
    `
    INSERT INTO studytime(user_id, create_date) VALUES(?, now())
    `,
    [dto.userId],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null);
      }
    },
  );
};

// 오늘 공부 시간 업데이트
const postUpdateTodayUserStudytimeDao = (dto, callback) => {
  db.query(
    `
      UPDATE studytime SET studytime = SEC_TO_TIME(TIME_TO_SEC(?) + TIME_TO_SEC(studytime)) WHERE user_id = ?\
      AND DATE(create_date) = DATE(now())
      `,
    [dto.studytime, dto.userId],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null);
      }
    },
  );
};

module.exports = {
  getTotalStudytimeDao,
  getMonthlyAllStudytimeDao,
  getMonthlyUserStudytimeDao,
  getMonthlyListUserStudytimeDao,
  getTodayUserStudytimeDao,
  getCheckTodayUserStudytimeDao,
  postCreateTodayUserStudytimeDao,
  postUpdateTodayUserStudytimeDao,
};
