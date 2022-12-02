const models = require('../models');
const jwt = require('jsonwebtoken');

async function homemitra(req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]
  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "mitra") {
    const ambil = await models.Program.findAll({
      include: [
        { 
          model: models.KategoriProgram, as: 'KategoriPrograms',
          attributes: ['id','nama','gambar']
      }
      ],
      attributes: ['id','nama','gambar'],
      where: {
        id_mitra: verified.id_user
      }
    })
    res.status(200).json({
      message: 'Success show data',
      data: ambil
    })
  } else {
    res.status(500).json({
      message: "Invalid credentials!",
    });
  }
}
async function homemitradetail(req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]
  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "mitra") {
    const id = req.params.id
   
      const ambil = await models.Program.findAll({
        include: [
          { 
            model: models.DataMitra, as: 'DataMitras',
            attributes: ['id','nama_mitra','nama_perusahaan','bidang','jumlah_anggota','alamat'],
         }
        ],
        attributes: ['id','nama','deskripsi','tanggal_mulai','tanggal_selesai','informasi_tambahan','kode_kegiatan','gambar'],
        where: {
          id: id
        }
      })
      res.status(200).json({
        message: 'Success show data',
        data: ambil
      })
    } else {
      res.status(500).json({
        message: "Invalid credentials!",
      });
    }
}
async function edithomemitra(req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]
  const verified = jwt.verify(token, 'secret')

  if (verified.posisi === "mitra") {
    const id = req.params.id
      await models.Program.update({     
        nama: req.body.nama
      }, 
      {
        where: {
          id: id
        }
      });

      const program = await models.Program.findByPk(id)

      res.status(200).json({
        message: 'Success update data',
        data: program
      })
    }
    else {
    res.status(500).json({
      message: "Invalid credentials!",
    });
  }
}
async function deletehomemitra(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret') 
 
  if (verified.posisi === "mitra") {
    const id = req.params.id
    // check id in table todolist
    // let hapus = await models.Program.findByPk(id)
    // proses delete data
    await models.Program.destroy({
      where: {
        id: id
      }
    })
    const hapus = await models.Program.findByPk(id)
    res.json({
      status: 200,
      message: 'Success delete data',
      data: hapus
    })
  }
}
async function kirimprogram(req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "mitra") {
    const id = verified.id_user
    const mitra = await models.DataMitra.findOne({ where: { id_user: id } });
    const tampung = await models.Program.create({
      nama: req.body.nama,
      deskripsi: req.body.deskripsi,
      tanggal_mulai: req.body.tanggal_mulai,
      tanggal_selesai: req.body.tanggal_selesai,
      kriteria: req.body.kriteria,
      informasi_tambahan: req.body.informasi_tambahan,
      kode_kegiatan: req.body.kode_kegiatan,
      status_program: "dibuka",
      gambar: req.file.filename,
      id_kategori: req.body.id_kategori,
      id_mitra: mitra.id
    })
    res.status(200).json({
      message: 'Success create data',
      data: tampung
    })

  } else {
    res.status(500).json({
      message: "Invalid credentials!",
    });
  }
}
module.exports = {
  kirimprogram: kirimprogram,
  homemitra: homemitra,
  homemitradetail: homemitradetail,
  edithomemitra: edithomemitra,
  deletehomemitra:deletehomemitra
}