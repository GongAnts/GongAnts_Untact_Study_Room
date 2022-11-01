const dao = require('../dao/friend');
const logger =
  process.env.NODE_ENV === 'production'
    ? require('../config/productionLogger')
    : require('../config/devLogger');

// 친구 검색
const getSearchFriendService = (dto, callback) => {
  let state;
  dao.getSearchFriendDao(dto, function (err, data) {
    if (err) {
      logger.error(`[getSearchFriend] ${err}`);
      return callback(err);
    }
    this.data = data;
  });
  dao.getFriendStateDao(dto, function (err, data) {
    if (err) {
      logger.error(`[getSearchFriend] ${err}`);
      return callback(err);
    }
    if (data === undefined) state = -1;
    else state = data['state'];
    this.data['state'] = state;
    return callback(err, this.data);
  });
};

// 친구 리스트 조회
const getFriendListService = (dto, callback) => {
  dao.getFriendListDao(dto, function (err, data) {
    if (err) {
      logger.error(`[getFriendList] ${err}`);
      return callback(err);
    }
    return callback(null, data);
  });
};

// 친구 요청 조회
const getFriendRequestService = (dto, callback) => {
  dao.getFriendRequestDao(dto, function (err, data) {
    if (err) {
      logger.error(`[getFriendRequest] ${err}`);
      return callback(err);
    }
    return callback(null, data);
  });
};

// 친구 요청 보내기
const postFriendRequestService = (dto, callback) => {
  dao.postFriendRequestDao(dto, function (err, data) {
    if (err) {
      logger.error(`[postFriendRequest] ${err}`);
      return callback(err);
    }
    return callback(null, data);
  });
};

// 친구 요청 처리
const putFriendRequestService = (dto, callback) => {
  // 친구 요청 승인 -> 친구 테이블에 친구 컬럼 추가하는 과정
  if (dto.state == 1) {
    dao.postFriendDao(dto, function (err, data) {
      if (err) {
        logger.error(`[putFriendRequest] ${err}`);
        return callback(err);
      }
    });
  }
  dao.putFriendRequestDao(dto, function (err, data) {
    if (err) {
      logger.error(`[putFriendRequest] ${err}`);
      return callback(err);
    }
    return callback(null, data);
  });
};

// 친구 삭제
const deleteFriendService = (dto, callback) => {
  dao.deleteFriendDao(dto, function (err, data) {
    if (err) {
      logger.error(`[deleteFriendRequest] ${err}`);
      return callback(err);
    }
    return callback(null, data);
  });
};

module.exports = {
  getSearchFriendService,
  getFriendListService,
  getFriendRequestService,
  postFriendRequestService,
  putFriendRequestService,
  deleteFriendService,
};
