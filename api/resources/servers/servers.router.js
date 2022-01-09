const { Router } = require('express')
const serversController = require('./servers.controller')

const serversRouter = Router({ mergeParams: true })

serversRouter
  .get('/config', serversController.getConfig)
  .patch('/nick', serversController.updateNick)
  .patch('/prefix', serversController.updatePrefix)
  .patch('/activity', serversController.updateActivity)
  .post('/poll', serversController.createPoll)

module.exports = serversRouter
