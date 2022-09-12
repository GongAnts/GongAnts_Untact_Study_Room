const dao = require('../dao/todo');

// 전체 할일 리스트 로드
const getAllTodoService = (dto, callback) => {
  dao.getAllTodoDao(dto, function (err, data) {
    return callback(err, data);
  });
};

//월별 할일 리스트 로드
const getMonthlyTodoService = async (dto, callback) => {
  dao.getMonthlyTodoDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 오늘 할일 리스트 로드
const getTodayTodoService = async (dto, callback) => {
  dao.getTodayTodoDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 할일 상세 정보 로드
const getDetailTodoService = async (dto, callback) => {
  dao.getDetailTodoDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 할일 추가
const postTodoService = async (dto, callback) => {
  dao.postTodoDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 할일 수정
const putTodoService = async (dto, callback) => {
  dao.putTodoDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 할일 상태 수정
const putTodoStateService = async (dto, callback) => {
  dao.putTodoStateDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 할일 삭제
const deleteTodoService = async (dto, callback) => {
  dao.deleteTodoDao(dto, function (err, data) {
    return callback(err, data);
  });
};

module.exports = {
  getAllTodoService,
  getMonthlyTodoService,
  getTodayTodoService,
  getDetailTodoService,
  postTodoService,
  putTodoService,
  putTodoStateService,
  deleteTodoService,
};
