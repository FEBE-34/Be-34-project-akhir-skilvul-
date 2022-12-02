const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path')
//ini menuju ke controller
const homepenyandangController = require('../controllers/homepenyandang.controller');

router.get("/lihat", homepenyandangController.homepenyandang);
// router.get("/lihat", homepenyandangController.homeprogrampenyandang);

// router.get("/lihat/:id", programmitraController.detailprogrammitra);

module.exports = router;