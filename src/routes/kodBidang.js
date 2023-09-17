const express = require('express');
const router = express.Router();
const kodBidangController = require('../controller/kod-bidang-controller');

router.get('/', kodBidangController.getKodBidang);

module.exports = router;