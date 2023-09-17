const express = require('express');
const router = express.Router();
const claimController = require('../controller/claim-controller');
const validator = require('express-joi-validation').createValidator({});
const multer = require('multer');
const upload = multer();

router.post('/submit', upload.fields([{ name: 'file' }, { name: 'bakiPeruntukan' }, { name: 'receipt' }]), claimController.submit);
router.post('/submitPastClaim', upload.fields([
    { name: 'bakiPeruntukan' },
    { name: 'resitKlinik' },
    { name: 'resitPembayaran' },
    { name: 'amaunTuntutan' },
    { name: 'tarikhTuntutan' }
]), claimController.submitPastClaim);
router.get('/getBalance', claimController.getBalance);
router.get('/history', claimController.getClaimHistoryByUserId);
router.get('/monthlyClaims/:id/:pastMonth', claimController.getMonthlyClaimsByUserId);
router.get('/approvalList', claimController.getApprovalList);
router.post('/submitApproval', claimController.approveClaim);
router.get('/pendingPayment', claimController.getPendingPayment);
router.post('/processPayment', upload.fields([{ name: 'file' }, { name: 'claimId', }]), claimController.processPayment);
router.get('/history/:userId', claimController.getClaimsByUserId)
router.get('/recent', claimController.getRecentClaims);
router.get('/countByDepartment', claimController.getClaimsByDepartment);
router.get('/getBalanceByDepartment', claimController.getBalanceByDepartment);
router.get('/getAllClaims', claimController.getAllClaims);
router.get('/getTotalAmountImbursed', claimController.getAmountImbursed);
module.exports = router;