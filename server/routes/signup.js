const express = require('express');
const router = express();
const db = require('../config/db');
const bcrypt = require('bcrypt');

router.use(express.json());
var saltRounds = 10;

router.post('/', (req, res) => {
  const body = req.body;
  const { user_id, user_name, user_email, user_password } = body;
  console.log(body);
  if (!user_id || !user_name || !user_email || !user_password) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql1 = `SELECT COUNT(*) AS result FROM user WHERE user_id = 'u${user_id}'`;
  db.query(sql1, (err, data) => {
    if (!err) {
      // 동일 user_name 존재
      if (data[0].result > 0) {
        console.log('이미 존재하는 user_id 입니다.');
        res.status(400).send({ msg1: 'Incorrect user_id.' });
      } else {
        const sql2 = `SELECT COUNT(*) AS result FROM user WHERE user_email = '${user_email}'`;
        db.query(sql2, (err, data) => {
          if (!err) {
            // 동일 user_email 존재
            if (data[0].result > 0) {
              console.log('이미 존재하는 user_email 입니다.');
              res.status(400).send({ msg2: 'Incorrect user_email.' });
            } else {
              // name, email 미존재 확인 -> DB 저장
              // 해시, 솔트 값 자동 생성
              ////////////////////////////////// password db에 저장하는 부분 배포 전에 제거하기!//////////////////////////////////
              bcrypt.hash(user_password, saltRounds, (err, hash) => {
                if (!err) {
                  const sql3 = `INSERT INTO user(user_id, user_type, user_name, user_email, user_hash, user_password) VALUES('u${user_id}', 'local', '${user_name}', '${user_email}', '${hash}', '${user_password}')`;
                  db.query(sql3, (err, data) => {
                    if (!err) {
                      console.log('DB 저장 성공');
                      res.status(200).send(body);
                    } else {
                      console.log('DB 저장 실패');
                      res.status(500).send(err);
                    }
                  });
                } else {
                  // Hash Error
                  res.status(500).send(err);
                }
              });
            }
          } else {
            res.status(500).send(err);
          }
        });
      }
    } else {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
