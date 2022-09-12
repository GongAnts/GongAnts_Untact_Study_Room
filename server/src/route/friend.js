const express = require('express');
const router = express.Router();
const controller = require('../controller/friend');

router.get('/search', controller.getSearchFriendController);
router.get('/list', controller.getFriendListController);

module.exports = router;
