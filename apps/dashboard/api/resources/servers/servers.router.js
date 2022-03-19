import { Router } from 'express'
import { ServerController } from './servers.controller'

const serversRouter = Router({ mergeParams: true })

serversRouter
  .get('/config', ServerController.getConfig)
  .get('/channels', ServerController.getChannels)
  .patch('/channels', ServerController.setChannels)
  .patch('/nick', ServerController.updateNick)
  .patch('/activity', ServerController.updateActivity)
  .post('/poll', ServerController.createPoll)

export { serversRouter }
