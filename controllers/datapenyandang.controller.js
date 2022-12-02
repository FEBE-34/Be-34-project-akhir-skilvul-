const models = require('../models');
const Validator = require('fastest-validator')
const jwt = require('jsonwebtoken')

const v = new Validator()

async function getallpenyandang(req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]
  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
    const id = verified.id_user
   const penyandang = await models.DataPenyandang.findOne({where:{id_user:id}})
    console.log(penyandang.id)
    if (penyandang) {
      const kontakpribadi = await models.KontakPribadi.findAll({
        where: {
          id_user: penyandang.id_user
        }
      })
      const datapenyandang = await models.DataPenyandang.findAll({
        where: {
          id_user: penyandang.id_user
        }
      })
      res.json({
        status: 200,
        message: 'Success Show data',
        DataPenyandang: datapenyandang,
        KontakPribadi:kontakpribadi
      })
    }
   }
}
  async function createDatapribadi(req, res) {
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
    const verified = jwt.verify(token, 'secret')
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
      const temp = await models.DataPenyandang.create({
        nama: req.body.nama,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        nik: req.body.nik,
        id_user: verified.id_user
      })
      res.json({
        status: 200,
        message: 'Success create data',
        data: temp
      })
    }
  }
  async function getDataPribadi(req, res) {
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
    const verified = jwt.verify(token, 'secret')
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
      const id = verified.id_user
    //  console.log(id)
      // const ambil = await models.DataPenyandang.findByPk(id)
      // const nama = req.params.nama
      const penyandang = await models.DataPenyandang.findOne({ where:{ id_user: id} })
      // console.log(penyandang.id)
      // if (penyandang) {
      //   const ambil = await models.DataPenyandang.findAll({
      //     where: {
      //       id: penyandang.id
      //     }
      //   })
        res.status(200).json({
          message: 'Success show data',
          data: penyandang
        })
      }
    // }
  }
  async function editDataPribadi(req, res) {
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
    const verified = jwt.verify(token, 'secret')
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
      const id = verified.id_user
      const penyandang = await models.DataPenyandang.findOne({ where:{ id_user: id} })
   
      // const ambil = await models.DataPenyandang.findByPk(penyandang)
      // const nama = req.params.nama
    //   const penyandang = await models.DataPenyandang.findOne({ nama: nama })
      if (penyandang) {
        await models.DataPenyandang.update({ nama: req.body.nama }, {
          where: {
            id_user: penyandang.id_user
          }
        })
        res.status(200).json({
          message: 'Success update data',
        })
      }
    }
  }
  async function createkontakpribadi(req, res) {
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]

    const verified = jwt.verify(token, 'secret')
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
      // const id = req.params.id
      // const idpenyandang = await models.DataPenyandang.findByPk(id);
      const temp = await models.KontakPribadi.create({
        no_hp: req.body.no_hp,
        alamat: req.body.alamat,
        provinsi: req.body.provinsi,
        kota: req.body.kota,
        kecamatan: req.body.kecamatan,
        desa: req.body.desa,
        kode_pos: req.body.kode_pos,
        id_user: verified.id_user
      })
      res.json({
        status: 200,
        message: 'Success create data',
        data: temp
      })
    }
  }
  async function getKontakPribadi(req, res) {
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
    const verified = jwt.verify(token, 'secret')
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
      const id = verified.id_user
      const penyandang = await models.KontakPribadi.findOne({ id_user: id })
      if (penyandang) {
        const ambil = await models.KontakPribadi.findAll({
          where: {
            id_user: penyandang.id
          }
        })
        res.status(200).json({
          message: 'Success show data',
          data: ambil
        })
      }
    }
  }
  async function editKontakPribadi(req, res) {
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
    const verified = jwt.verify(token, 'secret')
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
      const id = verified.id_user
      const penyandang = await models.KontakPribadi.findOne({ id_user: id })
      if (penyandang) {
        await models.KontakPribadi.update({ no_hp: req.body.no_hp }, {
          where: {
            id_user: penyandang.id
          }
        })
        res.status(200).json({
          message: 'Success update data'
        })
      }
    }
  }

  async function creatuploadberkas(req, res) {

    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]

    const verified = jwt.verify(token, 'secret')
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {

      // const id = req.params.id
      // const idpenyandang = await models.DataPenyandang.findByPk(id);

      const temp = await models.UploadBerkas.create({
        file_dokter: req.file.filename,
        id_user: verified.id_user
      })
      res.json({
        status: 200,
        message: 'Success create data',
        data: temp
      })
    }
  }
  
  module.exports = {
    createDatapribadi: createDatapribadi,
    createkontakpribadi: createkontakpribadi,
    creatuploadberkas: creatuploadberkas,
    getDataPribadi: getDataPribadi,
    editDataPribadi: editDataPribadi,
    getKontakPribadi:getKontakPribadi,
    editKontakPribadi:editKontakPribadi,
    getallpenyandang:getallpenyandang
  
  }
