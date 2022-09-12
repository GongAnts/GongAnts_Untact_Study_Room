const express = require('express');
const router = express.Router();
const controller = require('../controller/schedule');

router.get('/all', controller.getAllScheduleController);
router.get('/monthly', controller.getMonthlyScheduleController);
router.get('/today', controller.getTodayScheduleController);
router.get('/', controller.getDetailScheduleController);
router.post('/', controller.postScheduleController);
router.put('/', controller.putScheduleController);
router.delete('/', controller.deleteScheduleController);

module.exports = router;
