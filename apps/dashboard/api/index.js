import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import database from 'database'
import './utils/bot'

import { userRouter } from './resources/user/user.router'
import { authRouter } from './resources/auth/auth.router'
import { serversRouter } from './resources/servers/servers.router'

const { db } = database
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(session({
  secret: process.env.NUXT_APP_SECRET,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create(db)
}))

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/servers/:serverId', serversRouter)

export default app
