const express = require('express');
const router = express.Router();
const tenderController = require('../controller/tender-controller');
const multer = require('multer');
const upload = multer();

router.post('/submit', upload.fields([
    { name: 'dokumenTender' },
]), tenderController.submitTender);

router.get('/get/pending', tenderController.getPendingApprovalTenders);
router.get('/get', tenderController.getTenders);
router.post('/approve', tenderController.approveTender);

module.exports = router;