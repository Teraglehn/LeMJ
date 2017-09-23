let express = require('express')
let router = express.Router()

// POST /api/login to log in the user and add him to the req.session.authUser
router.post('/login', function (req, res) {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ message: 'Bad credentials' })
})

// POST /api/logout to log out the user and remove it from the req.session
router.post('/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

/* GET Userlist page. */
router.get('/userlist', function (req, res) {
  let db = req.db
  let collection = db.get('usercollection')
  collection.find({}, {}, function (e, docs) {
    res.json({
      'userlist': docs
    })
  })
})

/* GET Userlist page. */
router.get('/user', function (req, res) {
  let db = req.db
  let collection = db.get('usercollection')
  collection.findOne({_id: '59c5103fed57b40d513ba22c'}, {}, function (e, docs) {
    res.json({
      'userlist': docs
    })
  })
})

module.exports = router
