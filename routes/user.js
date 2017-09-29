let express = require('express')
let router = express.Router()
let crypto = require('crypto')

router.use(function (req, res, next) {
  req.hash = crypto.createHash('sha256')
  next()
})

router.post('/login', function (req, res) {
  let db = req.db
  let hash = req.hash
  let users = db.get('users')
  hash.update(req.body.username + ':' + req.body.password)

  users.findOne({id: hash.digest('hex')}, {})
    .then((user) => {
      if (req.body.remember) {
        res.cookie('autoLogin', user.id)
      }
      delete user.id
      req.session.authUser = user
      res.json(user)
    }, (e) => {
      res.status(401).json({ message: 'Bad credentials' })
    })
})

router.post('/logout', function (req, res) {
  delete req.session.authUser
  res.clearCookie('autoLogin')
  res.json({ message: 'Logged out' })
})

router.post('/register', function (req, res) {
  let db = req.db
  let hash = req.hash
  let users = db.get('users')
  hash.update(req.body.username + ':' + req.body.password)

  users.findOne({username: req.body.username}, {}).then(
    function (user) {
      if (!user) {
        users.insert({
          username: req.body.username,
          id: hash.digest('hex')
        }, {}, function () {
          res.json({ message: 'Registered successfully' })
        })
      } else {
        res.status(401).json({
          message: 'Username already exist'
        })
      }
    })
})

module.exports = router
