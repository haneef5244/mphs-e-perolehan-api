const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');
const { loginQuerySchema, registrationQuerySchema } = require('../validator/user-validation');
const validator = require('express-joi-validation').createValidator({});
const multer = require('multer');
const upload = multer();

router.post('/login', validator.body(loginQuerySchema), userController.login);
router.post('/register', validator.body(registrationQuerySchema), userController.register);
router.get('/me', userController.getMe);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.get('/profile', userController.getProfile);
router.get('/pendingAssignment', userController.getUsersPendingRoleAssignment);
router.post('/role', userController.updateUserRole);
router.get('/countByDeparments', userController.getUserCountByDepartment);
router.post('/update', userController.updateUser);
router.get('/verify/:id', userController.verify);
router.post('/picture', upload.fields([{ name: 'profilePicture' }]), userController.updateUserProfilePicture)
router.get('/wsToken', userController.getWsToken);
router.get('/notificationsWsToken', userController.getNotificationWsToken);
router.get('/notifications', userController.getNotifications);
router.post('/notifications/read', userController.readNotification);
router.get('/getUsersInfo', userController.getUsersInfo);
router.get('/roles', userController.getRoles);
router.post('/deleteUser', userController.deleteUser);
router.post('/forgotPassword', userController.forgotPassword);
router.get('/validateResetPassword/:id', userController.validateResetPassword);
router.post('/resetPassword', userController.resetPassword);
router.get('/pegawai', userController.getPegawai);
module.exports = router;