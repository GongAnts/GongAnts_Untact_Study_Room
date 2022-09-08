const statusCode = require('../constant/statusCode');
const service = require('../service/auth');

// 회원가입
const postSignupController = (req, res) => {
  const dto = {
    id: 'u' + req.body.user_id,
    type: 'local',
    name: req.body.user_name,
    email: req.body.user_email,
    hash: null,
    password: req.body.user_password,
  };
  if (!dto.id || !dto.name || !dto.email || !dto.password) {
    res.status(statusCode.BAD_REQUEST).send('Bad Request');
  }

  service.postSignupService(dto, (err, data) => {
    if (err) {
      if (data) {
        res.status(statusCode.BAD_REQUEST).send(data);
      } else {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
      }
    } else {
      res.status(statusCode.OK).send(data);
    }
  });
};

module.exports = {
  postSignupController,
};
