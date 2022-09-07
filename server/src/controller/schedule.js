const statusCode = require('../constant/statusCode');
const service = require('../service/schedule');

// 전체 일정 로드
const getAllScheduleController = (req, res) => {
  const dto = { userId: req.user.user_id };
  if (!dto.userId) {
    return res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }

  service.getAllScheduleService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 월별 일정 로드
const getMonthlyScheduleController = (req, res) => {
  const dto = {
    userId: req.user.user_id,
    year: req.query.year,
    month: req.query.month,
  };
  if (!dto.userId) {
    return res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }
  if (!dto.year || !dto.month)
    return res.status(statusCode.BAD_REQUEST).send('Bad Request');

  service.getMonthlyScheduleService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 오늘 일정 로드
const getTodayScheduleController = (req, res) => {
  const dto = { userId: req.user.user_id };
  if (!dto.userId) {
    return res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }

  service.getTodayScheduleService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 일정 상세 로드
const getDetailScheduleController = (req, res) => {
  const dto = { scheduleId: req.query.id };
  if (!dto.scheduleId) {
    return res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.getDetailScheduleService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 일정 추가
const postScheduleController = (req, res) => {
  const dto = {
    userId: req.user.user_id,
    year: Number(req.body.date.substring(0, 4)),
    month: Number(req.body.date.substring(4, 6)),
    day: Number(req.body.date.substring(6, 8)),
    hour: Number(req.body.time.substring(0, 2)),
    minute: Number(req.body.time.substring(2, 4)),
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
  };
  if (!dto.userId)
    return res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  if (
    !dto.year ||
    !dto.month ||
    !dto.day ||
    !dto.hour ||
    !dto.minute ||
    !dto.title ||
    !dto.description ||
    !dto.priority
  )
    return res.status(statusCode.BAD_REQUEST).send('Bad Request');

  service.postSchduleService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK);
    }
  });
};

// 일정 수정
const putScheduleController = (req, res) => {
  const dto = {
    id: req.body.id,
    year: Number(req.body.date.substring(0, 4)),
    month: Number(req.body.date.substring(4, 6)),
    day: Number(req.body.date.substring(6, 8)),
    hour: Number(req.body.time.substring(0, 2)),
    minute: Number(req.body.time.substring(2, 4)),
    title: req.body.title,
    description: req.body.description,
    check: req.body.check,
    priority: req.body.priority,
  };
  if (!dto.id) return res.status(statusCode.BAD_REQUEST).send('Bad Request');

  service.postSchduleService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK);
    }
  });
};

// 일정 삭제
const deleteScheduleController = (req, res) => {
  const dto = {
    id: req.query.id,
  };
  if (!dto.id) return res.status(statusCode.BAD_REQUEST).send('Bad Request');

  service.postSchduleService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK);
    }
  });
};

module.exports = {
  getAllScheduleController,
  getMonthlyScheduleController,
  getTodayScheduleController,
  getDetailScheduleController,
  postScheduleController,
  putScheduleController,
  deleteScheduleController,
};
