const express = require('express');
const router = express();
const db = require('../config/db');

router.use(express.json());

// 전체 할일 리스트 로드
router.get('/all', (req, res) => {
  var user_id = req.user.user_id;

  const sql = `SELECT * FROM todo WHERE user_id = '${user_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(500).send(err);
    }
  });
});

//월별 할일 리스트 로드
router.get('/monthly', (req, res) => {
  var year = req.query.year;
  var month = req.query.month;
  var user_id = req.user.user_id;

  if (!year || !month) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `SELECT * FROM todo WHERE user_id = '${user_id}' \
    AND DATE_FORMAT(create_date, '%Y-%c') = '${year}-${month}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(500).send(err);
    }
  });
});

// 오늘 할일 리스트 로드
router.get('/today', (req, res) => {
  var user_id = req.user.user_id;

  const sql = `SELECT * FROM todo WHERE user_id = '${user_id}'\
    AND DATE(create_date) = DATE(now())`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(500).send(err);
    }
  });
});

// 할일 상세 정보 로드
router.get('/detail', (req, res) => {
  const todo_id = req.query.id;
  const sql = `SELECT * FROM todo WHERE todo_id = '${todo_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(500).send(err);
    }
  });
});

// 할일 추가
router.post('/', (req, res) => {
  var user_id = req.user.user_id;
  const todo_title = req.body.todo_title;

  var todo_data = {
    user_id: `${user_id}`,
    todo_title: `${todo_title}`,
  };
  if (!todo_title) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `INSERT INTO todo(user_id, todo_title) VALUES('${user_id}', '${todo_title}')`;

  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(todo_data);
    } else {
      res.status(500).send(err);
    }
  });
});

// 할일 수정
router.put('/', (req, res) => {
  const { todo_id, todo_title } = req.body;
  if (!todo_id || !todo_title) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `UPDATE todo SET todo_title = '${todo_title}' WHERE todo_id = '${todo_id}';`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(req.body);
    } else {
      res.status(500).send(err);
    }
  });
});

// 할일 상태 수정
router.put('/check', (req, res) => {
  const todo_id = req.query.id;
  var todo_data = {
    todo_id: `${todo_id}`,
  };
  if (!todo_id) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `UPDATE todo SET todo_check = !todo_check WHERE todo_id = ${todo_id};`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(todo_data);
    } else {
      res.status(500).send(err);
    }
  });
});

// 할일 삭제
router.delete('/', (req, res, next) => {
  const todo_id = req.query.id;
  var todo_data = {
    todo_id: `${todo_id}`,
  };
  if (!todo_id) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `DELETE FROM todo WHERE todo_id = ${todo_id};`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(todo_data);
    } else {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
