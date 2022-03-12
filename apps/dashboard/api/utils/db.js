import mongoose from 'mongoose'
import redis from 'redis'

const redisClient = redis.createClient()

mongoose.connect(process.env.NUXT_APP_MONGO_URL || 'mongodb://localhost:27017/local', ({
  useNewUrlParser: true,
  useUnifiedTopology: true
}))

const connection = mongoose.connection

connection.on('error', () => console.error('Error connecting to database'))
connection.once('open', () => console.info('Successfully connected to database'))

const configSchema = new mongoose.Schema({
  prefix: {
    type: String,
    required: true
  },
  giveawayChannel: {
    type: String,
    required: false
  },
  starboardChannel: {
    type: String,
    required: false
  }
})

configSchema.post('save', function savePrefix (doc) {
  redisClient.set('prefix', doc.prefix)
  redisClient.expire('prefix', 30, () => console.log('prefix expired!')) // 900s => 15m
})

const ConfigModel = mongoose.model('config', configSchema)

export {
  ConfigModel,
  connection
}
