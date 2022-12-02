const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path')
//ini menuju ke controller
const homemitraController = require('../controllers/homemitra.controller');

router.get("/lihat", homemitraController.homemitra);
router.get("/lihat/detail/:id", homemitraController.homemitradetail);
// router.get("/lihat/detail/edit/:id", homemitraController.edithomemitra);
router.put("/lihat/:id", homemitraController.edithomemitra);
router.delete("/lihat/delete/:id", homemitraController.deletehomemitra);
// router.get("/tambahprogram", homemitraController.tambahprogram);
const fileStroge = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null,file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
  }
  const upload = multer({
    storage:fileStroge,
    fileFilter: fileFilter
  })
router.post("/tambahprogram",upload.single('gambar'),homemitraController.kirimprogram);
module.exports = router;