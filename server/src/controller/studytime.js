const statusCode = require('../constant/statusCode');
const service = require('../service/studytime');

// 전체 공부 시간 로드
const getTotalStudytimeController = (req, res) => {
  const dto = { userId: req.user.user_id };
  if (!dto.userId) {
    return res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }

  service.getTotalStudytimeService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 전체 사용자 월별 공부 시간 로드
getMonthlyAllStudytimeController = (req, res) => {
  const dto = { year: Number(req.query.year), month: Number(req.query.month) };
  if (!dto.year || !dto.month)
    return res.status(statusCode.BAD_REQUEST).send('Bad Request');

  service.getMonthlyAllStudytimeService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 사용자별 월별 공부 시간 로드
getMonthlyUserStudytimeController = (req, res) => {
  const dto = {
    userId: req.user.user_id,
    year: Number(req.query.year),
    month: Number(req.query.month),
  };
  if (!dto.year || !dto.month)
    return res.status(statusCode.BAD_REQUEST).send('Bad Request');

  service.getMonthlyUserStudytimeService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 월별 공부 시간 로드(캘린더 용)
getMonthlyListUserStudytimeController = (req, res) => {
  const dto = {
    userId: req.user.user_id,
    year: Number(req.query.year),
    month: Number(req.query.month),
  };
  if (!dto.userId)
    return res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  if (!dto.year || !dto.month)
    return res.status(statusCode.BAD_REQUEST).send('Bad Request');

  service.getMonthlyListUserStudytimeService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 오늘 공부 시간 로드
getTodayUserStudytimeController = (req, res) => {
  const dto = {
    userId: req.user.user_id,
  };
  if (!dto.userId)
    return res.status(statusCode.UNAUTHORIZED).send('Unauthorized');

  service.getTodayUserStudytimeService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 공부 시간 저장
postSaveUserStudytimeController = (req, res) => {
  const dto = {
    userId: req.user.user_id,
    studytime: `${req.body.hour}:${req.body.minute}:${req.body.second}`,
  };
  if (!dto.userId)
    return res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  if (!dto.studytime)
    return res.status(statusCode.BAD_REQUEST).send('Bad Request');

  service.postSaveUserStudytimeService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK);
    }
  });
};

module.exports = {
  getTotalStudytimeController,
  getMonthlyAllStudytimeController,
  getMonthlyUserStudytimeController,
  getMonthlyListUserStudytimeController,
  getTodayUserStudytimeController,
  postSaveUserStudytimeController,
};
