let express = require('express')
let router = express.Router()

let campaigns = require('./resources/campaigns')

// Verrouillage authentification
router.use((req, res, next) => {
  if (!req.session || !req.session.authUser) {
    res.status(403).json({message: 'Unauthorize'})
  } else {
    next()
  }
})

router.use('/campaigns', campaigns)

module.exports = router
