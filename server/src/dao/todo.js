const db = require('../config/db');

// 전체 할일 리스트 로드
const getAllTodoDao = (dto, callback) => {
  db.query(
    `
    SELECT * FROM todo WHERE user_id = ?
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

//월별 할일 리스트 로드
const getMonthlyTodoDao = (dto, callback) => {
  db.query(
    `
    SELECT * FROM todo WHERE user_id = ? \
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

// 오늘 할일 리스트 로드
const getTodayTodoDao = (dto, callback) => {
  db.query(
    `
    SELECT * FROM todo WHERE user_id = ?\
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

// 할일 상세 정보 로드
const getDetailTodoDao = (dto, callback) => {
  db.query(
    `
    SELECT * FROM todo WHERE todo_id = ?
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

// 할일 추가
const postTodoDao = (dto, callback) => {
  db.query(
    `
    INSERT INTO todo(user_id, todo_title) VALUES(?, ?)
    `,
    [dto.userId, dto.title],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null);
      }
    },
  );
};

// 할일 수정
const putTodoDao = (dto, callback) => {
  db.query(
    `
    UPDATE todo SET todo_title = ? WHERE todo_id = ?
    `,
    [dto.title, dto.id],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null);
      }
    },
  );
};

// 할일 상태 수정
const putTodoStateDao = (dto, callback) => {
  db.query(
    `
    UPDATE todo SET todo_check = !todo_check WHERE todo_id = ?
    `,
    [dto.id],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null);
      }
    },
  );
};

// 할일 삭제
const deleteTodoDao = (dto, callback) => {
  db.query(
    `
    DELETE FROM todo WHERE todo_id = ?
    `,
    [dto.id],
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
  getAllTodoDao,
  getMonthlyTodoDao,
  getTodayTodoDao,
  getDetailTodoDao,
  postTodoDao,
  putTodoDao,
  putTodoStateDao,
  deleteTodoDao,
};
