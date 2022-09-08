const dao = require('../dao/friend');

// 친구 검색
const getSearchFriendService = (dto, callback) => {
  dao.getSearchFriendDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 친구 리스트 조회
const getFriendListService = (dto, callback) => {
  dao.getFriendListDao(dto, function (err, data) {
    return callback(err, data);
  });
};

module.exports = {
  getSearchFriendService,
  getFriendListService,
};
