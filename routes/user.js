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
  let users = db.get('usercollection')
  hash.update(req.body.password)

  users.findOne({id: req.body.username}, {}, function (e, user) {
    if (user && user.password === hash.digest('hex')) {
      delete user.password
      req.session.authUser = user
      return res.json(user)
    } else {
      res.status(401).json({ message: 'Bad credentials' })
    }
  })
})

router.post('/logout', function (req, res) {
  delete req.session.authUser
  res.json({ action: 'Logged out' })
})

router.post('/register', function (req, res) {
  let db = req.db
  let hash = req.hash
  let users = db.get('usercollection')
  hash.update(req.body.password)

  users.findOne({id: req.body.username}, {}, function (e, user) {
    if (!user) {
      users.insert({
        id: req.body.username,
        password: hash.digest('hex')
      }, {castIds: false}, function (){
        res.json({ action: 'Registered successfully' })
      })
    } else {
      res.status(401).json({ message: 'Username already exist' })
    }
  })
})

module.exports = router
