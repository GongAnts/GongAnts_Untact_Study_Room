const statusCode = require('../constant/statusCode');
const service = require('../service/friend');

// 친구 검색
const getSearchFriendController = (req, res) => {
  const dto = { userEmail: req.user.user_email, friendEmail: req.query.email };
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

// 친구 요청 조회
const getFriendRequestController = (req, res) => {
  const dto = { userEmail: req.user.user_email };
  if (!dto.userEmail) {
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }

  service.getFriendRequestService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 친구 요청 보내기
const postFriendRequestController = (req, res) => {
  const dto = { userEmail: req.user.user_email, friendEmail: req.query.email };
  if (!dto.userEmail | !dto.friendEmail) {
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }

  service.postFriendRequestService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK);
    }
  });
};

// 친구 요청 처리
const putFriendRequestController = (req, res) => {
  const dto = {
    userEmail: req.user.user_email,
    friendEmail: req.query.email,
    state: parseInt(req.query.state),
  };
  if (!dto.userEmail | !dto.friendEmail | !dto.state) {
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }

  service.putFriendRequestService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send();
    }
  });
};

// 친구 삭제
const deleteFriendController = (req, res) => {
  const dto = { userEmail: req.user.user_email, friendEmail: req.query.email };
  if (!dto.userEmail | !dto.friendEmail) {
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }

  service.deleteFriendService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send();
    }
  });
};

module.exports = {
  getSearchFriendController,
  getFriendListController,
  getFriendRequestController,
  postFriendRequestController,
  putFriendRequestController,
  deleteFriendController,
};
