let express = require('express')
let router = express.Router()

let user = require('./user')
let rest = require('./rest')

router.use('/user', user)
router.use('/rest', rest)

module.exports = router
