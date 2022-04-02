const express = require('express');
const router = express();
const db = require('../config/db');

router.use(express.json());

// 연결 테스트용
router.get('/', (req, res) => {
  console.log('onsignin 서버 페이지입니다');
  console.log(req.session);
  console.log(req.user);
  res.status(200).send('/');
});

// 로그인
/**
 * 1. sql1에서 user_name 존재 여부 판단
 * 1-1. 미존재시, msg1 전달
 * 2. user_name 존재 시, sql2에서 user_password와 일치 확인
 * 2-1. 불일치시, msg2 전달
 * 3. user_name, user_password 모두 일치 시 세션 저장
 */

// 회원가입
/**
 * 1. sql1에서 user_name 존재 여부 판단
 * 1-1. 존재시, msg1 전달
 * 1-2. 미존재시, sql2에서 user_email 존재 여부 판단
 * 1-2-1. 존재시, msg2 전달
 * 1-2-2. 미존재시, DB 저장
 */
router.post('/', (req, res) => {
  const body = req.body;
  const { user_name, user_email, user_password } = body;
  console.log(body);
  if (!user_name || !user_email || !user_password) {
    return res.status(400).send({ statusMsg: 'Bad Request' });
  }
  const sql1 = `SELECT COUNT(*) AS result FROM user WHERE user_name = '${user_name}'`;
  db.query(sql1, (err, data) => {
    if (!err) {
      // 동일 user_name 존재
      if (data[0].result > 0) {
        console.log('이미 존재하는 user_name 입니다.');
        res.status(400).send({ msg1: 'User_name incorrect.' });
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
              const sql3 = `INSERT INTO user(user_name, user_email, user_password) VALUES('${user_name}', '${user_email}', '${user_password}')`;
              db.query(sql3, (err, data) => {
                if (!err) {
                  console.log('DB 저장 성공');
                  res.status(200).send(body);
                } else {
                  console.log('DB 저장 실패');
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
