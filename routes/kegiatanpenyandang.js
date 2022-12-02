const express = require('express');
const router = express.Router();

//ini menuju ke controller
const kegiatanpenyandangController = require('../controllers/kegiatanpenyandang.controller');

router.get("/lihat", kegiatanpenyandangController.kegiatanpenyandang);
router.get("/aktif", kegiatanpenyandangController.kegiatanaktifpenyandang);

module.exports = router;