const statusCode = require('../constant/statusCode');
const service = require('../service/todo');

// 전체 할일 리스트 로드
const getAllTodoController = (req, res) => {
  const dto = { userId: req.user.user_id };
  if (!dto.userId) {
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }

  service.getAllTodoService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

//월별 할일 리스트 로드
const getMonthlyTodoController = (req, res) => {
  const dto = {
    userId: req.user.user_id,
    year: Number(req.query.year),
    month: Number(req.query.month),
  };
  if (!dto.userId) {
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }
  if (!dto.year || !dto.month) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.getMonthlyTodoService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 오늘 할일 리스트 로드
const getTodayTodoController = (req, res) => {
  const dto = {
    userId: req.user.user_id,
  };
  if (!dto.userId) {
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }

  service.getTodayTodoService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 할일 상세 정보 로드
const getDetailTodoController = (req, res) => {
  const dto = {
    id: req.query.id,
  };
  if (!dto.id) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.getDetailTodoService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

// 할일 추가
const postTodoController = (req, res) => {
  const dto = {
    userId: req.user.user_id,
    title: req.body.todo_title,
  };
  if (!dto.userId) {
    res.status(statusCode.UNAUTHORIZED).send('Unauthorized');
  }
  if (!dto.title) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.postTodoService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send();
    }
  });
};

// 할일 수정
const putTodoController = (req, res) => {
  const dto = {
    id: req.body.todo_id,
    title: req.body.todo_title,
  };
  if (!dto.id || !dto.title) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.putTodoService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK).send();
    }
  });
};

// 할일 상태 수정
const putTodoStateController = (req, res) => {
  const dto = {
    id: req.query.id,
  };
  if (!dto.id) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.putTodoStateService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK);
    }
  });
};

// 할일 삭제
const deleteTodoController = (req, res) => {
  const dto = {
    id: req.query.id,
  };
  if (!dto.id) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.deleteTodoService(dto, (err, data) => {
    if (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(statusCode.OK);
    }
  });
};

module.exports = {
  getAllTodoController,
  getMonthlyTodoController,
  getTodayTodoController,
  getDetailTodoController,
  postTodoController,
  putTodoController,
  putTodoStateController,
  deleteTodoController,
};
