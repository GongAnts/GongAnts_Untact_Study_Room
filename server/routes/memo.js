const express = require('express');
const router = express();
const db = require('../config/db');

router.use(express.json());

router.get('/load', (req, res) => {
  var user_id = req.user.user_id;

  const sql = `SELECT * FROM memo WHERE user_id = '${user_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('메모 로딩 성공', data);
      res.status(200).send(data);
    } else {
      console.log('메모 로딩 실패');
      res.status(500).send(err);
    }
  });
});

router.post('/write', (req, res) => {
  const body = req.body;
  var { memo_title, memo_content } = body;
  var user_id = req.user.user_id;
  var memo_data = {
    user_id: `${user_id}`,
    memo_title: `${memo_title}`,
    memo_content: `${memo_content}`,
  };
  console.log(memo_data);
  const sql = `INSERT INTO memo(user_id, memo_title, memo_content) VALUES('${user_id}', '${memo_title}', '${memo_content}')`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('메모 저장 성공');
      res.status(200).send(memo_data);
    } else {
      console.log('메모 저장 실패');
      res.status(500).send(err);
    }
  });
});

// request URL Example : http://localhost:4000/memo/detail?id=1
router.get('/detail', (req, res) => {
  const memo_id = req.query.id;
  const sql = `SELECT * FROM memo WHERE memo_id = '${memo_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      const body = {
        memo_title: data[0].memo_title,
        memo_content: data[0].memo_content,
        memo_date: data[0].memo_date,
      };
      console.log('메모 로딩 성공', body);
      res.status(200).send(body);
    } else {
      console.log('메모 로딩 실패');
      res.status(500).send(err);
    }
  });
});

// request URL Example : http://localhost:4000/memo/delete?id=1
router.delete('/delete', (req, res) => {
  const memo_id = req.query.id;
  var memo_data = {
    memo_id: `${memo_id}`,
  };
  console.log(memo_data);
  if (!memo_id) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `DELETE FROM memo WHERE memo_id = '${memo_id}';`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('메모 삭제 성공');
      res.status(200).send(memo_data);
    } else {
      console.log('메모 삭제 실패');
      res.status(500).send(err);
    }
  });
});

router.post('/modify', (req, res) => {
  const { memo_id, memo_title, memo_content } = req.body;
  if (!memo_id) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `UPDATE memo SET memo_title = '${memo_title}', memo_content = '${memo_content}', memo_date = now() WHERE memo_id = '${memo_id}';`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('메모 수정 성공');
      res.status(200).send(req.body);
    } else {
      console.log('메모 수정 실패');
      res.status(500).send(err);
    }
  });
});

module.exports = router;
