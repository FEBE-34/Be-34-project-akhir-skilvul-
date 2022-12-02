const models = require('../models');
const jwt = require('jsonwebtoken');

async function programmitra(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret') 
 
  if (verified.posisi === "mitra") {
  
        const lihatprogram = await models.Program.findAll({
            include: [
              { 
                model: models.DataMitra, as: 'DataMitras',
                attributes: ['id','nama_mitra']
            }
            ],
            attributes: ['id','nama','deskripsi','gambar','status_program'],
            where: {
              id_mitra: verified.id_user
            }
          })
          res.status(200).json({
            message: 'Success show data',
            data: lihatprogram
          })
  }else {
    res.status(500).json({
      message: "Invalid credentials!",
    });
  }
}
async function detailprogrammitra(req,res){
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
  
    const verified = jwt.verify(token, 'secret') 
   
    if (verified.posisi === "mitra") {
        const id = req.params.id
        const detailprogram = await models.Program.findAll({
            include: [
              { 
                model: models.DataMitra, as: 'DataMitras',
                attributes: ['id','nama_mitra']
            }
            ],
            attributes: ['id','nama','deskripsi','gambar','status_program'],
            where: {
              id:id 
            }
          })
          res.status(200).json({
            message: 'Success show data',
            data: detailprogram
          })
    }    
}
module.exports = {
    programmitra:programmitra,
    detailprogrammitra:detailprogrammitra
  }