let express = require('express')
let router = express.Router()
let crypto = require('crypto')
let {body, validationResult} = require('express-validator/check')

router.use(function (req, res, next) {
  req.hash = crypto.createHash('sha256')
  next()
})

router.post('/login', [
  body('username').exists().withMessage('Vous devez fournir un identifiant'),
  body('password').exists().withMessage('Vous devez renseigner un mot de passe !')
], function (req, res) {
  let db = req.db
  let hash = req.hash
  let users = db.get('users')
  hash.update(req.body.username + ':' + req.body.password)

  try {
    validationResult(req).throw()

    users.findOne({id: hash.digest('hex')}, {})
      .then((user) => {
        if (user) {
          delete user.id
          req.session.authUser = user
          res.json(user)
        } else {
          res.status(401).json({ message: 'L\'identifiant ou le mot de passe est incorrect' })
        }
      }, (e) => {
        res.status(500)
      })
  } catch (err) {
    res.status(400).json({
      errors: err.mapped()
    })
  }
})

router.post('/logout', function (req, res) {
  delete req.session.authUser
  res.clearCookie('autoLogin')
  res.json({ message: 'Logged out' })
})

router.post('/register', [
  body('username').exists().withMessage('Vous devez fournir un identifiant')
    .isAlphanumeric('fr-FR').withMessage('L\'identifiant doit être au format alphanumérique !')
    .custom((value, { req }) => {
      let db = req.db
      let users = db.get('users')
      return users.findOne({username: req.body.username}, {}).then(function (user) {
        if (user) {
          throw new Error('L\'identifiant existe déjà')
        } else {
          return true
        }
      })
    }).withMessage('L\'identifiant existe déjà !')
    .isLength({ min: 4 }).withMessage('L\'identifiant doit faire au moins 4 caractères de long !'),
  body('email').exists().withMessage('Vous devez fournir un email')
    .isEmail().withMessage('L\'email n\'est pas valide !'),
  body('password').exists().withMessage('Vous devez renseigner un mot de passe !')
    .isLength({ min: 8 }).withMessage('Le mot de passe doit faire au moins 8 caractères de long !')
], function (req, res) {
  let db = req.db
  let hash = req.hash
  let users = db.get('users')
  hash.update(req.body.username + ':' + req.body.password)

  try {
    validationResult(req).throw()

    users.insert({
      username: req.body.username,
      email: req.body.email,
      id: hash.digest('hex')
    }, {}, function () {
      res.json({ message: 'Enregistrement réussi !' })
    })
  } catch (err) {
    res.status(400).json({
      errors: err.mapped()
    })
  }

})

module.exports = router
