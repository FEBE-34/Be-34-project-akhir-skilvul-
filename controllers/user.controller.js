const models = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {kirimEmail} = require('../helpers')
function signUp (req, res) {
  //Sign up
  models.User.findOne({ where: { email: req.body.email } })
    .then(result => {
      if (result) {
        res.status(409).json({
          message: 'Email already exists!'
        })
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              nama: req.body.nama,
              email: req.body.email,
              password: hash,
              posisi: req.body.posisi
            }

            models.User.create(user)
              .then(result => {
                res.status(200).json({
                  message: 'User created successfully',
                  data: user
                })
              })
              .catch(error => {
                console.log(error)
                res.status(400).json({
                  message: 'Something went wrong!'
                })
              })
          })
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Something went wrong!'
      })
    })
}

function login (req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (user === null) {
        res.status(401).json({
          message: 'Invalid credentials!'
        })
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  id_user: user.id,
                  nama: user.nama,
                  posisi: user.posisi
                },
                'secret',
                { expiresIn: '1h' },
                function (err, token) {
                  res.status(200).json({
                    message: 'Authentication successful!',
                    token
                  })
                }
              )
            } else {
              res.status(400).json({
                message: 'Invalid credentials!'
              })
            }
          }
        )
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Something went wrong!'
      })
    })
}

async function forgotpassword (req, res) {
  const { email } = req.body
  const user = await models.User.findOne({ where:{ email: email} })
  if (!user) {
    res.status(400).json({
      status: false,
      message: 'email tidak tersedia'
    })
  } else {
    const token = jwt.sign(
      {
        id_user: user.id
      },
      'secret',
      { expiresIn: '1h' }
    )

    await models.User.update(
      { resetpasswordLink: token },
      {
        where: {
          id: user.id
        }
      }
    )
    const templateEmail = {
        from:'help-desk',
        to: email,
        subject: 'Reset Password:',
        html: `<p>Silahkan klik link di bawah ini untuk reset password anda</p><p>${process.env.CLIENT_URL}/user/resetpassword/${token}</p>`   
    }
    kirimEmail(templateEmail)
    res.status(200).json({
      status: true,
      message: 'berhasil dikirim'
    })
  }
  // if(user){
  //     res.status(400).json({
  //         status: false,
  //         message: 'email tidak tersedia'
  //     })
  //     const token = jwt.sign({
  //         id_user: user.id,},
  //         'secret', { expiresIn: '1h' });

  //     await models.User.update({ resetpasswordLink: token }, {
  //         where: {
  //           id: user.id
  //         }
  //       });
  //       res.status(200).json({
  //         message: 'berhasil dikirim'
  //       })
  // }
}
async function lihatresetpassword(req,res){
  const {token} = req.params
  const user = await models.User.findOne({resetpasswordLink:token})
  res.status(200).json({
    message:'success',
    data: user
  })
}
async function resetPassword (req,res){
  const {token,password} = req.body
  const user = await models.User.findOne({resetpasswordLink:token})
  if(user){
    const hashPassword = await bcryptjs.hash(password,10)
    await models.User.update({password:hashPassword},{
      where:{
        id:user.id
      }
    })
    res.status(200).json({
      message:'berhasil di update'
    })
  }
}
module.exports = {
  signUp: signUp,
  login: login,
  forgotpassword: forgotpassword,
  resetPassword:resetPassword,
  lihatresetpassword:lihatresetpassword,
}
