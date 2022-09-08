const statusCode = require('../constant/statusCode');
const service = require('../service/friend');

// 친구 검색
const getSearchFriendController = (req, res) => {
  const dto = { friendEmail: req.query.email };
  if (!dto.friendEmail) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.getSearchFriendService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 친구 리스트 조회
const getFriendListController = (req, res) => {
  const dto = { userEmail: req.user.user_email };
  if (!dto.userEmail) {
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }

  service.getFriendListService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

module.exports = {
  getSearchFriendController,
  getFriendListController,
};
