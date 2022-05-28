const express = require('express');
const router = express();
const db = require('../config/db');

router.use(express.json());

router.get('/', (req, res) => {
  var user_id = req.user.user_id;

  const sql = `SELECT * FROM memo WHERE user_id = '${user_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(500).send(err);
    }
  });
});

router.get('/detail', (req, res) => {
  const memo_id = req.query.memo_id;
  const sql = `SELECT * FROM memo WHERE memo_id = '${memo_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(data[0]);
    } else {
      res.status(500).send(err);
    }
  });
});

router.post('/', (req, res) => {
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
      res.status(200).send(memo_data);
    } else {
      res.status(500).send(err);
    }
  });
});

router.put('/', (req, res) => {
  const { memo_id, memo_title, memo_content } = req.body;
  if (!memo_id) {
    return res.status(400).send({ msg: 'Bad Request' });
  }
  const sql = `UPDATE memo SET memo_title = '${memo_title}', memo_content = '${memo_content}', memo_date = now() WHERE memo_id = '${memo_id}';`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(req.body);
    } else {
      res.status(500).send(err);
    }
  });
});

router.delete('/', (req, res) => {
  const memo_id = req.query.id;
  var memo_data = {
    memo_id: `${memo_id}`,
  };
  if (!memo_id) {
    return res.status(400).send({ msg: 'Bad Request' });
  }
  const sql = `DELETE FROM memo WHERE memo_id = '${memo_id}';`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(memo_data);
    } else {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
