const statusCode = require('../constant/statusCode');
const service = require('../service/schedule');

// 전체 일정 로드
const getAllScheduleController = (req, res) => {
  const dto = { userId: req.user.user_id };
  if (!dto.userId) {
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
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
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }
  if (!dto.year || !dto.month) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

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
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
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
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
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
    date:
      req.body.date.substring(0, 4) +
      '-' +
      req.body.date.substring(5, 7) +
      '-' +
      req.body.date.substring(8, 10) +
      ' ' +
      req.body.time.substring(0, 2) +
      ':' +
      req.body.time.substring(3, 5) +
      ':00',
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
  };

  if (!dto.userId) {
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }
  if (!dto.date || !dto.title || !dto.description || !dto.priority) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.postScheduleService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send();
    }
  });
};

// 일정 수정
const putScheduleController = (req, res) => {
  const dto = {
    id: req.body.id,
    date:
      req.body.date.substring(0, 4) +
      '-' +
      req.body.date.substring(5, 7) +
      '-' +
      req.body.date.substring(8, 10) +
      ' ' +
      req.body.time.substring(0, 2) +
      ':' +
      req.body.time.substring(3, 5) +
      ':00',
    title: req.body.title,
    description: req.body.description,
    check: req.body.check,
    priority: req.body.priority,
  };
  if (!dto.id) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.putScheduleService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send();
    }
  });
};

// 일정 삭제
const deleteScheduleController = (req, res) => {
  const dto = {
    id: req.query.id,
  };
  if (!dto.id) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.deleteScheduleService(dto, (err, data) => {
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
