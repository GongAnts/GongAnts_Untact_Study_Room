const dao = require('../dao/schedule');

// 전체 일정 로드
const getAllScheduleService = (dto, callback) => {
  dao.getAllScheduleDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 월별 일정 로드
const getMonthlyScheduleService = (dto, callback) => {
  dao.getMonthlyScheduleDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 오늘 일정 로드
const getTodayScheduleService = (dto, callback) => {
  dao.getTodayScheduleDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 일정 상세 로드
const getDetailScheduleService = (dto, callback) => {
  dao.getDetailScheduleDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 일정 추가
const postScheduleService = (dto, callback) => {
  dao.postScheduleDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 일정 수정
const putScheduleService = (dto, callback) => {
  dao.putScheduleDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 일정 삭제
const deleteScheduleService = (dto, callback) => {
  dao.deleteScheduleDao(dto, function (err, data) {
    return callback(err, data);
  });
};

module.exports = {
  getAllScheduleService,
  getMonthlyScheduleService,
  getTodayScheduleService,
  getDetailScheduleService,
  postScheduleService,
  putScheduleService,
  deleteScheduleService,
};
