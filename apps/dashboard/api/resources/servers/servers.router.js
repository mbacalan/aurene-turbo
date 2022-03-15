const { Router } = require('express')
const serversController = require('./servers.controller')

const serversRouter = Router({ mergeParams: true })

serversRouter
  .get('/config', serversController.getConfig)
  .get('/channels', serversController.getChannels)
  .patch('/channels', serversController.setChannels)
  .patch('/nick', serversController.updateNick)
  .patch('/activity', serversController.updateActivity)
  .post('/poll', serversController.createPoll)

module.exports = serversRouter
