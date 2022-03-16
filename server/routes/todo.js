const express = require('express');
const router = express();
const db = require('../config/db');

router.use(express.json());

// 전체 할일 리스트 로드
router.get('/load/all', (req, res) => {
  var user_id = req.user.user_id;

  if (req.user.user_google) {
    user_id = 'g' + user_id;
  } else {
    user_id = 'u' + user_id;
  }
  const sql = `SELECT * FROM todo WHERE user_id = '${user_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('전체 할일 리스트 조회 성공', data);
      res.status(200).send(data);
    } else {
      console.log('전체 할일 리스트 조회 실패');
      res.status(500).send(err);
    }
  });
});

//월별 할일 리스트 로드
router.get('/load/monthly', (req, res) => {
  var year = req.query.year;
  var month = req.query.month;
  var user_id = req.user.user_id;

  if (req.user.user_google) {
    user_id = 'g' + user_id;
  } else {
    user_id = 'u' + user_id;
  }
  if (!year || !month) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `SELECT * FROM todo WHERE user_id = '${user_id}' \
    AND DATE_FORMAT(create_date, '%Y-%c') = '${year}-${month}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('월별 할일 리스트 조회 성공', data);
      res.status(200).send(data);
    } else {
      console.log('월별 할일 리스트 조회 실패');
      res.status(500).send(err);
    }
  });
});

// 오늘 할일 리스트 로드
router.get('/load/today', (req, res) => {
  var user_id = req.user.user_id;

  if (req.user.user_google) {
    user_id = 'g' + user_id;
  } else {
    user_id = 'u' + user_id;
  }
  const sql = `SELECT * FROM todo WHERE user_id = '${user_id}'\
    AND DATE(create_date) = DATE(now())`;
  db.query(sql, (err, data) => {
    if (!err) {
      // 기존 저장 데이터가 있을 경우 로드
      if (data.length) {
        console.log('오늘 할일 리스트 로딩 성공');
        res.status(200).send(data);
      } else {
        console.log('오늘 할일 리스트 미존재');
        res.status(200).send({ msg: 'Nothing' });
      }
    } else {
      console.log('오늘 할일 리스트 로딩 실패');
      res.status(500).send(err);
    }
  });
});

// 할일 저장
router.post('/write', (req, res) => {
  var user_id = req.user.user_id;
  const todo_title = req.body.todo_title;
  if (req.user.user_google) {
    user_id = 'g' + req.user.user_id;
  } else {
    user_id = 'u' + req.user.user_id;
  }
  var todo_data = {
    user_id: `${user_id}`,
    todo_title: `${todo_title}`,
  };
  console.log(todo_data);
  if (!todo_title) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `INSERT INTO todo(user_id, todo_title) VALUES('${user_id}', '${todo_title}')`;

  db.query(sql, (err, data) => {
    if (!err) {
      console.log('할일 저장 성공');
      res.status(200).send(todo_data);
    } else {
      console.log('할일 저장 실패');
      res.status(500).send(err);
    }
  });
});

// request URL Example : http://localhost:4000/todo/detail?id=1
router.get('/detail', (req, res) => {
  const todo_id = req.query.id;
  const sql = `SELECT * FROM todo WHERE todo_id = '${todo_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('할일 로딩 성공');
      res.status(200).send(data);
    } else {
      console.log('할일 로딩 실패');
      res.status(500).send(err);
    }
  });
});

// 할일 삭제
router.delete('/delete', (req, res, next) => {
  const todo_id = req.query.id;
  var todo_data = {
    todo_id: `${todo_id}`,
  };
  console.log(todo_data);
  if (!todo_id) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `DELETE FROM todo WHERE todo_id = ${todo_id};`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('할일 삭제 성공');
      res.status(200).send(todo_data);
    } else {
      console.log('할일 삭제 실패');
      res.status(500).send(err);
    }
  });
});

// 할일 수정
router.post('/modify', (req, res) => {
  const { todo_id, todo_title } = req.body;
  if (!todo_id || !todo_title) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `UPDATE todo SET todo_title = '${todo_title}' WHERE todo_id = '${todo_id}';`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('할일 수정 성공');
      res.status(200).send(req.body);
    } else {
      console.log('할일 수정 실패');
      res.status(500).send(err);
    }
  });
});

// 할일 상태 수정
router.post('/check', (req, res) => {
  const todo_id = req.body.todo_id;
  if (!todo_id) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `UPDATE todo SET todo_check = !todo_check WHERE todo_id = ${todo_id};`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('할일 상태 수정 성공');
      res.status(200).send(req.body);
    } else {
      console.log('할일 상태 수정 실패');
      res.status(500).send(err);
    }
  });
});

module.exports = router;
