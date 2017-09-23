const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()

// MongoDB database
const monk = require('monk')
const db = monk('localhost:27017/lemj')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '3000'

const api = require('./routes/api')

// Body parser, to access req.body
app.use(bodyParser.json())

// Make our db accessible to our router
app.use(function (req, res, next) {
  req.db = db
  next()
})

// Sessions to create req.session
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

let nuxt = new Nuxt(config)

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)

app.listen(port, host, function () {
  console.log('Server started on port %s:%d in %s mode', host, port, app.settings.env)
})
