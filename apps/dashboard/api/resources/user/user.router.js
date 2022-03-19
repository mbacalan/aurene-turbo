import { Router } from 'express'
import { UserController } from './user.controller'

const userRouter = Router()

userRouter.get('/', UserController.getUser)
userRouter.get('/bot', UserController.getBot)

export { userRouter }
