const express = require('express');
const router = express();
const db = require('../config/db');

router.use(express.json());

router.get('/load/all', (req, res) => {
  var user_id = req.user.user_id;

  if (req.user.user_google) {
    user_id = 'g' + user_id;
  } else {
    user_id = 'u' + user_id;
  }
  const sql = `SELECT * FROM calendar WHERE user_id = '${user_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('전체 일정 조회 성공', data);
      res.status(200).send(data);
    } else {
      console.log('전체 일정 조회 실패');
      res.status(500).send(err);
    }
  });
});

router.get('/load/today', (req, res) => {
  var user_id = req.user.user_id;

  if (req.user.user_google) {
    user_id = 'g' + user_id;
  } else {
    user_id = 'u' + user_id;
  }
  const sql = `SELECT * FROM calendar WHERE user_id = '${user_id}' \
    AND DATE(schedule_date) = DATE(now())`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('오늘 일정 조회 성공', data);
      res.status(200).send(data);
    } else {
      console.log('오늘 일정 조회 실패');
      res.status(500).send(err);
    }
  });
});

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

  const sql = `SELECT * FROM calendar WHERE user_id = '${user_id}' \
    AND DATE_FORMAT(schedule_date, '%Y-%c') BETWEEN '${year}-${month}' AND '${year}-${month}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('월별 일정 조회 성공', data);
      res.status(200).send(data);
    } else {
      console.log('월별 일정 조회 실패');
      res.status(500).send(err);
    }
  });
});

router.post('/write', (req, res) => {
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

  if (req.user.user_google) {
    user_id = 'g' + req.user.user_id;
  } else {
    user_id = 'u' + req.user.user_id;
  }
  var schedule_data = {
    user_id: `${user_id}`,
    schedule_title: `${schedule_title}`,
    schedule_description: `${schedule_description}`,
    schedule_date: `${schedule_date}`,
  };
  console.log(schedule_data);
  const sql = `INSERT INTO calendar(user_id, schedule_title, schedule_date, schedule_description) VALUES('${user_id}', '${schedule_title}', '${schedule_date}', '${schedule_description}')`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('일정 저장 성공');
      res.status(200).send(schedule_data);
    } else {
      console.log('일정 저장 실패');
      res.status(500).send(err);
    }
  });
});

// request URL Example : http://localhost:4000/calendar/detail?id=1
router.get('/detail', (req, res) => {
  const schedule_id = req.query.id;
  const sql = `SELECT * FROM calendar WHERE schedule_id = '${schedule_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('일정 로딩 성공');
      res.status(200).send(data);
    } else {
      console.log('일정 로딩 실패');
      res.status(500).send(err);
    }
  });
});

router.delete('/delete', (req, res) => {
  const schedule_id = req.body.schedule_id;
  var schedule_data = {
    schedule_id: `${schedule_id}`,
  };
  console.log(schedule_data);
  if (!schedule_id) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `DELETE FROM calendar WHERE schedule_id = '${schedule_id}';`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('일정 삭제 성공');
      res.status(200).send(schedule_data);
    } else {
      console.log('일정 삭제 실패');
      res.status(500).send(err);
    }
  });
});

router.post('/modify', (req, res) => {
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
  const sql = `UPDATE calendar SET schedule_title = '${schedule_title}', schedule_date = '${schedule_date}', \
    schedule_description = '${schedule_description}' WHERE schedule_id = '${schedule_id}';`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('일정 수정 성공');
      res.status(200).send(schedule_data);
    } else {
      console.log('일정 수정 실패');
      res.status(500).send(err);
    }
  });
});

module.exports = router;
