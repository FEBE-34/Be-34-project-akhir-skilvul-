const express = require('express');
const router = express.Router();
//ini menuju ke controller
const userController = require('../controllers/user.controller');
//registrasi
router.post("/signup", userController.signUp);
//login
router.post("/login", userController.login)

router.put('/forgotpassword', userController.forgotpassword)
router.get('/resetpassword/:token', userController.lihatresetpassword)
router.put('/resetpassword/:token', userController.resetPassword)
module.exports = router;