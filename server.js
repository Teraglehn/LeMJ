const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoDBStore = require('connect-mongodb-session')(session)
const cors = require('cors')

const app = require('express')()

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')

// MongoDB database
const monk = require('monk')
const db = monk(config.env.MONGODB_URL)

const store = new MongoDBStore({
  uri: config.env.MONGODB_URL,
  collection: 'sessions'
})

const api = require('./routes/api')

// Body parser, to access req.body
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors({
  origin: [config.env.BASE_URL],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true // enable set cookie
}))

// Make our db accessible to our router
app.use(function (req, res, next) {
  req.db = db
  next()
})

// Sessions to create req.session
app.use(session({
  secret: 'T&U%mg?p*%,;??q[6Z{2nN4:Qy$8d#QSR2C\\!2/e6.S$!2-2}&ZF`>T`ASVuxQCG',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 // 1h
  }
}))

app.use('/api', api)

config.dev = !(process.env.NODE_ENV === 'production')

let nuxt = new Nuxt(config)

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)

const host = config.env.HOST || '192.168.0.10'
const port = config.env.PORT || '3000'

app.listen(port)
console.log('Server started on port %s:%d in %s mode', host, port, app.settings.env)
