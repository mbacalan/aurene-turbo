const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')

const { mongooseConnection } = require('./utils/db')
require('dotenv').config({ path: '.env.local' })
require('./utils/db')
require('./utils/bot')

const userRouter = require('./resources/user/user.router')
const authRouter = require('./resources/auth/auth.router')
const serversRouter = require('./resources/servers/servers.router')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))
app.use(session({
  secret: process.env.NUXT_APP_SECRET,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create(mongooseConnection)
}))

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/servers/:serverId', serversRouter)

module.exports = app
