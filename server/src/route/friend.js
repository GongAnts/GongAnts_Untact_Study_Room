const express = require('express');
const router = express.Router();
const controller = require('../controller/friend');

router.get('/search', controller.getSearchFriendController);
router.get('/list', controller.getFriendListController);
router.get('/request', controller.getFriendRequestController);
router.post('/request', controller.postFriendRequestController);
router.put('/request', controller.putFriendRequestController);

module.exports = router;
