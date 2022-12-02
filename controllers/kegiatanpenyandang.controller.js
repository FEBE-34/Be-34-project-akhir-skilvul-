const models = require('../models');
const jwt = require('jsonwebtoken');

async function kegiatanpenyandang(req,res){
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
  
    const verified = jwt.verify(token, 'secret') 
   
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
        const id  = verified.id_user
      const datapenyandang =  await models.DataPenyandang.findOne({where:{id_user: id }})
        const kegiatan = await models.pilihprogram.findAll({ 
          include:
          [
            // models.DataPenyandang,
            // models.Program
            {
              model: models.DataPenyandang
            },
            {
              model: models.Program,
              include: [models.DataMitra]
              },
          
          ],
          where:{
          id_datapenyandang:datapenyandang.id,
          status:"daftar"
        }
          })
          res.status(200).json({
            message: 'Success show data',
            kegiatan: kegiatan
          })
    }
}
async function kegiatanaktifpenyandang(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret') 
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
    const id  = verified.id_user
    const datapenyandang =  await models.DataPenyandang.findOne({where:{id_user: id }})
      const kegiatan = await models.pilihprogram.findAll({ 
        include:[{
            model: models.Program,
            include: [models.DataMitra]
            },
            {
              model: models.DataPenyandang
            }
        ],
        where:{
          id_datapenyandang:datapenyandang.id,
          status:"diterima"
        }
      })
      res.status(200).json({
        message: 'Success show data',
        // program: homeprogrampenyandang,
        kegiatan: kegiatan
      })    
  }
}
module.exports = {
    kegiatanpenyandang:kegiatanpenyandang,
    kegiatanaktifpenyandang:kegiatanaktifpenyandang
  }