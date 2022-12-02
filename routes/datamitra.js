const express = require('express');
const router = express.Router();

//ini menuju ke controller
const datamitraController = require('../controllers/datamitra.controller');

router.post("/datamitra",datamitraController.createDatamitra);

module.exports = router;