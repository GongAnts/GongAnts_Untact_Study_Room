const express = require('express');
const router = express();
const db = require('../config/db');

router.use(express.json());

// 전체 공부 시간 로드
router.get('/load/total', (req, res) => {
  var user_id = req.user.user_id;

  if (req.user.user_google) {
    user_id = 'g' + user_id;
  } else {
    user_id = 'u' + user_id;
  }
  const sql = `SELECT HOUR(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS hour,\
  MINUTE(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS minute,\
  SECOND(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS second\
  FROM studytime WHERE user_id = '${user_id}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('전체 공부 시간 조회 성공', data);
      res.status(200).send(data[0]);
    } else {
      console.log('전체 공부 시간 조회 실패');
      res.status(500).send(err);
    }
  });
});

//전체 사용자 월별 공부 시간 로드
router.get('/load/monthly/all', (req, res) => {
  var year = req.query.year;
  var month = req.query.month;
  if (!year || !month) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql = `SELECT HOUR(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS hour,\
  MINUTE(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS minute,\
  SECOND(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS second\
  FROM studytime WHERE DATE_FORMAT(create_date, '%Y-%c') = '${year}-${month}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('전체 사용자 월별 공부 시간 조회 성공', data);
      res.status(200).send(data[0]);
    } else {
      console.log('전체 사용자 월별 공부 시간 조회 실패');
      res.status(500).send(err);
    }
  });
});

//월별 전체 공부 시간 합계 로드
router.get('/load/monthly/total', (req, res) => {
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
  const sql = `SELECT HOUR(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS hour,\
  MINUTE(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS minute,\
  SECOND(SEC_TO_TIME(SUM(TIME_TO_SEC(studytime)))) AS second\
  FROM studytime WHERE user_id = '${user_id}' AND DATE_FORMAT(create_date, '%Y-%c') = '${year}-${month}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('월별 전체 공부 시간 조회 성공', data);
      res.status(200).send(data[0]);
    } else {
      console.log('월별 전체 공부 시간 조회 실패');
      res.status(500).send(err);
    }
  });
});

//월별 공부 시간 로드(캘린더 용)
router.get('/load/monthly/list', (req, res) => {
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
  const sql = `SELECT YEAR(create_date) AS year,\
  MONTH(create_date) AS month,\
  DAY(create_date) AS day,\
  HOUR(studytime) AS hour,\
  MINUTE(studytime) AS minute,\
  SECOND(studytime) AS second\
  FROM studytime WHERE user_id = '${user_id}' \
  AND DATE_FORMAT(create_date, '%Y-%c') = '${year}-${month}'`;
  db.query(sql, (err, data) => {
    if (!err) {
      console.log('월별 공부 시간 리스트 조회 성공', data);
      res.status(200).send(data);
    } else {
      console.log('월별 공부 시간 리스트 조회 실패');
      res.status(500).send(err);
    }
  });
});

// 오늘 공부 시간 로드
router.get('/load/today', (req, res) => {
  var user_id = req.user.user_id;

  if (req.user.user_google) {
    user_id = 'g' + user_id;
  } else {
    user_id = 'u' + user_id;
  }
  const sql = `SELECT HOUR(studytime) AS hour,\
  MINUTE(studytime) AS minute,\
  SECOND(studytime) AS second\
  FROM studytime WHERE user_id = '${user_id}'\
  AND DATE(create_date) = DATE(now())`;
  db.query(sql, (err, data) => {
    if (!err) {
      // 기존 저장 데이터가 있을 경우 로드
      if (data.length) {
        console.log('오늘 공부 시간 로딩 성공');
        res.status(200).send(data[0]);
      } else {
        console.log('오늘 공부 시간 미존재');
        res.status(200).send({ msg: 'Nothing', hour: 0, minute: 0, second: 0 });
      }
    } else {
      console.log('오늘 공부 시간 로딩 실패');
      res.status(500).send(err);
    }
  });
});

// 공부 시간 저장
router.post('/save', (req, res) => {
  const studytime = `${req.body.hour}:${req.body.minute}:${req.body.second}`;
  var user_id = req.user.user_id;
  if (req.user.user_google) {
    user_id = 'g' + req.user.user_id;
  } else {
    user_id = 'u' + req.user.user_id;
  }
  var studytime_data = {
    user_id: `${user_id}`,
    added_studytime: studytime,
  };
  console.log(studytime_data);

  if (!studytime) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql1 = `SELECT * FROM studytime WHERE user_id = '${user_id}'\
  AND DATE(create_date) = DATE(now())`;
  const sql2 = `INSERT INTO studytime(user_id, create_date) VALUES('${user_id}', now())`;
  const sql3 = `UPDATE studytime SET studytime = SEC_TO_TIME(TIME_TO_SEC('${studytime}') + TIME_TO_SEC(studytime)) WHERE user_id = '${user_id}'\
  AND DATE(create_date) = DATE(now())`;
  db.query(sql1, (err, data) => {
    if (!err) {
      if (data.length === 0) {
        // 오늘 데이터 존재 X
        console.log('오늘 공부 시간 미존재');
        db.query(sql2, (err, data) => {
          if (!err) {
            console.log('공부 시간 생성 성공');
          } else {
            console.log('공부 시간 생성 실패');
            res.status(500).send(err);
          }
        });
      }
      db.query(sql3, (err, data) => {
        if (!err) {
          console.log('공부 시간 저장 성공');
          res.status(200).send(studytime_data);
        } else {
          console.log('공부 시간 저장 실패');
          res.status(500).send(err);
        }
      });
    } else {
      console.log('오늘 공부 시간 조회 실패');
      res.status(500).send(err);
    }
  });
});

module.exports = router;
