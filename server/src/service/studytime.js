const dao = require('../dao/studytime');

// 전체 공부 시간 로드
const getTotalStudytimeService = (dto, callback) => {
  dao.getTotalStudytimeDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 전체 사용자 월별 공부 시간 로드
const getMonthlyAllStudytimeService = async (dto, callback) => {
  dao.getMonthlyAllStudytimeDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 사용자별 월별 공부 시간 로드
const getMonthlyUserStudytimeService = async (dto, callback) => {
  dao.getMonthlyUserStudytimeDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 월별 공부 시간 로드(캘린더 용)
const getMonthlyListUserStudytimeService = async (dto, callback) => {
  dao.getMonthlyListUserStudytimeDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 오늘 공부 시간 로드
const getTodayUserStudytimeService = async (dto, callback) => {
  dao.getTodayUserStudytimeDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 공부 시간 저장
const postSaveUserStudytimeService = async (dto, callback) => {
  dao.getCheckTodayUserStudytimeDao(dto, function (err, data) {
    if (err) {
      return callback(err);
    } else {
      // 오늘 공부 시간 미존재
      if (data.length === 0) {
        // 오늘 공부 시간 생성
        dao.postCreateTodayUserStudytimeDao(dto, function (err, data) {
          return callback(err, data);
        });
      }
      // 오늘 공부 시간 업데이트
      dao.postUpdateTodayUserStudytimeDao(dto, function (err, data) {
        return callback(err, data);
      });
    }
  });
};

module.exports = {
  getTotalStudytimeService,
  getMonthlyAllStudytimeService,
  getMonthlyUserStudytimeService,
  getMonthlyListUserStudytimeService,
  getTodayUserStudytimeService,
  postSaveUserStudytimeService,
};
