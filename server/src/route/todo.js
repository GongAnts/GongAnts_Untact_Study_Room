const express = require('express');
const router = express.Router();
const controller = require('../controller/todo');

router.get('/all', controller.getAllTodoController);
router.get('/monthly', controller.getMonthlyTodoController);
router.get('/today', controller.getTodayTodoController);
router.get('/detail', controller.getDetailTodoController);
router.post('/', controller.postTodoController);
router.put('/', controller.putTodoController);
router.put('/check', controller.putTodoStateController);
router.delete('/', controller.deleteTodoController);

module.exports = router;
