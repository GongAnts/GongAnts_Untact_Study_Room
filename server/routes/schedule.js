const express = require('express');
const router = express();
const db = require('../config/db');

router.use(express.json());

router.get('/all', (req, res) => {
  var user_id = req.user.user_id;

  const sql = `SELECT * FROM schedule WHERE user_id = '${user_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(500).send(err);
    }
  });
});

router.get('/today', (req, res) => {
  var user_id = req.user.user_id;

  const sql = `SELECT * FROM schedule WHERE user_id = '${user_id}' \
    AND DATE(schedule_date) = DATE(now())`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(500).send(err);
    }
  });
});

router.get('/monthly', (req, res) => {
  var year = req.query.year;
  var month = req.query.month;
  var user_id = req.user.user_id;

  if (!year || !month) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }

  const sql = `SELECT * FROM schedule WHERE user_id = '${user_id}' \
    AND DATE_FORMAT(schedule_date, '%Y-%c') BETWEEN '${year}-${month}' AND '${year}-${month}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(500).send(err);
    }
  });
});

router.post('/', (req, res) => {
  var user_id = req.user.user_id;
  if (!req.body.date) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const body = req.body;
  const year = body.date.substring(0, 4);
  const month = body.date.substring(4, 6);
  const day = body.date.substring(6, 8);
  const hour = body.time.substring(0, 2);
  const minute = body.time.substring(2, 4);
  const schedule_title = body.title;
  const schedule_description = body.description;
  var schedule_date = `${year}-${month}-${day} ${hour}:${minute}:00`;

  var schedule_data = {
    user_id: `${user_id}`,
    schedule_title: `${schedule_title}`,
    schedule_description: `${schedule_description}`,
    schedule_date: `${schedule_date}`,
  };
  const sql = `INSERT INTO schedule(user_id, schedule_title, schedule_date, schedule_description) VALUES('${user_id}', '${schedule_title}', '${schedule_date}', '${schedule_description}')`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(schedule_data);
    } else {
      res.status(500).send(err);
    }
  });
});

// request URL Example : http://localhost:4000/schedule/detail?id=1
router.get('/', (req, res) => {
  const schedule_id = req.query.id;
  const sql = `SELECT * FROM schedule WHERE schedule_id = '${schedule_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(500).send(err);
    }
  });
});

// schedule edit
router.put('/', (req, res) => {
  if (!req.body.date) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const body = req.body;
  const schedule_id = body.id;
  const year = body.date.substring(0, 4);
  const month = body.date.substring(4, 6);
  const day = body.date.substring(6, 8);
  const hour = body.time.substring(0, 2);
  const minute = body.time.substring(2, 4);
  const schedule_title = body.title;
  const schedule_description = body.description;
  var schedule_date = `${year}-${month}-${day} ${hour}:${minute}:00`;

  var schedule_data = {
    schedule_title: `${schedule_title}`,
    schedule_description: `${schedule_description}`,
    schedule_date: `${schedule_date}`,
  };
  console.log(schedule_data);
  const sql = `UPDATE schedule SET schedule_title = '${schedule_title}', schedule_date = '${schedule_date}', \
    schedule_description = '${schedule_description}' WHERE schedule_id = '${schedule_id}';`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(schedule_data);
    } else {
      res.status(500).send(err);
    }
  });
});

// schedule delete
router.delete('/', (req, res) => {
  const schedule_id = req.query.id;
  var schedule_data = {
    schedule_id: `${schedule_id}`,
  };
  if (!schedule_id) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `DELETE FROM schedule WHERE schedule_id = '${schedule_id}';`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.status(200).send(schedule_data);
    } else {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
