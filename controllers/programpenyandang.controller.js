const models = require('../models');
const jwt = require('jsonwebtoken');

async function programpenyandang(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret') 
 
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
      const programpenyandang = await models.Program.findAll({
      })
      const programmitrapenyandang = await models.DataMitra.findAll({
      })
      res.status(200).json({
        message: 'Success show data',
        // program: homeprogrampenyandang,
        program: programpenyandang,
        mitra:programmitrapenyandang
      })
    }else{
      res.status(500).json({
        message: "Invalid credentials!",
      });
      } 
}
// async function detailprogramkategori(req,res){
//   const auth = await req.headers.authorization
//   const token = await auth.split(' ')[1]

//   const verified = jwt.verify(token, 'secret') 
 
//   if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
//     const id = req.params.id 
//     const detailprogramkategori = await models.KategoriProgram.findAll({ 
//       attributes: ['id','nama','deskripsi','gambar'],
//       include:[{
//           model: models.Program,
//           include: [models.DataMitra]
//           }
//       ],
//       where:{
//       id:id
//     }
//       })
//       res.status(200).json({
//         message: 'Success show data',
//         // program: homeprogrampenyandang,
//         kategori: detailprogramkategori
//       })
//     }
// }
async function detailprogram(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret') 
 
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
    const id = req.params.id 
    const detailprogram = await models.Program.findAll({ 
      include:[{
          model: models.DataMitra
          }
      ],
      where:{
      id:id
    }
      })
      res.status(200).json({
        message: 'Success show data',
        // program: homeprogrampenyandang,
        kategori: detailprogram
      })
    }
}

async function daftarprogram(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret') 
 
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
    const id = req.params.id 
    const tampung =  await models.Program.findByPk(id)
    // const temp =  await models.DataPenyandang.findByPk(verified.id_user)
    const daftarprogram = await models.pilihprogram.create({ 
      id_program: tampung.id,
      id_datapenyandang: verified.id_user,
      status: "daftar"

    })
      res.status(200).json({
      message: 'Success create data',
      data: daftarprogram
    })
  }
}
module.exports = {
  programpenyandang:programpenyandang,
detailprogram:detailprogram,
daftarprogram:daftarprogram
  }