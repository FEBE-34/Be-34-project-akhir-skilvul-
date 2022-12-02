const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path')
//ini menuju ke controller
const programmitraController = require('../controllers/programmitra.controller');

router.get("/lihat", programmitraController.programmitra);
router.get("/lihat/:id", programmitraController.detailprogrammitra);

module.exports = router;