const db = require('../config/db');

// 전체 일정 로드
const getAllScheduleDao = (dto, callback) => {
  db.query(
    `
    SELECT * FROM schedule WHERE user_id = ?
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

// 월별 일정 로드
const getMonthlyScheduleDao = (dto, callback) => {
  db.query(
    `
    SELECT * FROM schedule WHERE user_id = ? \
    AND DATE_FORMAT(schedule_date, '%Y-%c') BETWEEN '?-?' AND '?-?' \
    SELECT * FROM schedule WHERE user_id = ?
    `,
    [
      dto.userId,
      Number(dto.year),
      Number(dto.month),
      Number(dto.year),
      Number(dto.month),
      dto.userId,
    ],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 오늘 일정 로드
const getTodayScheduleDao = (dto, callback) => {
  db.query(
    `
    SELECT * FROM schedule WHERE user_id = ? \
    AND DATE(schedule_date) = DATE(now())
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

// 일정 상세 로드
const getDetailScheduleDao = (dto, callback) => {
  db.query(
    `
      SELECT * FROM schedule WHERE schedule_id = ?
      `,
    [dto.scheduleId],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 일정 추가
const postScheduleDao = (dto, callback) => {
  db.query(
    `
      INSERT INTO schedule(user_id, schedule_title, schedule_date, schedule_priority, schedule_description ) \
      VALUES(?, ?, '?-?-? ?:?:00', ?, ?
      `,
    [
      dto.userId,
      dto.title,
      dto.year,
      dto.month,
      dto.day,
      dto.hour,
      dto.minute,
      dto.priority,
      dto.decription,
    ],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 일정 수정
const putScheduleDao = (dto, callback) => {
  db.query(
    `UPDATE schedule SET schedule_title = ?, schedule_date = '?-?-? ?:?:00', \
      schedule_check = ?, schedule_priority = ?,\
      schedule_description = ? WHERE schedule_id = ?
      `,
    [
      dto.title,
      dto.year,
      dto.month,
      dto.day,
      dto.hour,
      dto.minute,
      dto.check,
      dto.priority,
      dto.decription,
      dto.id,
    ],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 일정 삭제
const deleteScheduleDao = (dto, callback) => {
  db.query(
    `
      DELETE FROM schedule WHERE schedule_id = ?
      `,
    [dto.id],
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
  getAllScheduleDao,
  getMonthlyScheduleDao,
  getTodayScheduleDao,
  getDetailScheduleDao,
  postScheduleDao,
  putScheduleDao,
  deleteScheduleDao,
};
