const models = require('../models');
const jwt = require('jsonwebtoken')
async function createDatamitra(req,res){
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
  
    const verified = jwt.verify(token, 'secret')
    if (verified.posisi === "mitra") {
      const temp = await models.DataMitra.create({
        nama_mitra: verified.nama,
        nama_perusahaan: req.body.nama_perusahaan,
        bidang: req.body.bidang,
        jumlah_anggota: req.body.jumlah_anggota,
        alamat: req.body.alamat,
        id_user: verified.id_user
      })
      res.json({
        status: 200,
        message: 'Success create data',
        data: temp
      })
  }
  res.status(500).json({
    message: "Invalid credentials!",
});
}
module.exports = {
createDatamitra: createDatamitra
}