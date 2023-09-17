
const express = require('express');
const router = express.Router();
const users = require('./users');
const claim = require('./claim');
const file = require('./file');
const department = require('./department');
const kodBidang = require('./kodBidang');
const tender = require('./tender');

router.use('/user', users);
router.use('/claim', claim);
router.use('/file', file);
router.use('/department', department);
router.use('/kodBidang', kodBidang);
router.use('/tender', tender);

module.exports = router;