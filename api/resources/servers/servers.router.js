const { Router } = require('express')
const serversController = require('./servers.controller')

const serversRouter = Router({ mergeParams: true })

serversRouter.get('/config', serversController.getConfig)
serversRouter.patch('/nick', serversController.updateNick)
serversRouter.patch('/prefix', serversController.updatePrefix)
serversRouter.patch('/activity', serversController.updateActivity)
serversRouter.post('/poll', serversController.createPoll)

module.exports = serversRouter
