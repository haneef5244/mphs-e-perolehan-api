const express = require('express');
const router = express.Router();
const departmentController = require('../controller/department-controller');

router.get('/', departmentController.getDepartments);

module.exports = router;