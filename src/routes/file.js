const express = require('express');
const router = express.Router();
const fileController = require('../controller/file-controller');

router.get('/:claimId', fileController.getFile);
router.get('/tender/:name', fileController.getDokumenTender);

module.exports = router;