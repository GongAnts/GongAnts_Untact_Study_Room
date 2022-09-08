const express = require('express');
const router = express.Router();
const controller = require('../controller/studytime');

router.get('/load/total', controller.getTotalStudytimeController);
router.get('/load/monthly/all', controller.getMonthlyAllStudytimeController);
router.get('/load/monthly/total', controller.getMonthlyUserStudytimeController);
router.get(
  '/load/monthly/list',
  controller.getMonthlyListUserStudytimeController,
);
router.get('/load/today', controller.getTodayUserStudytimeController);
router.post('/save', controller.postSaveUserStudytimeController);

module.exports = router;
