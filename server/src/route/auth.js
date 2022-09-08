const express = require('express');
const router = express.Router();
const controller = require('../controller/auth');

router.post('/signup', controller.postSignupController);

module.exports = router;
