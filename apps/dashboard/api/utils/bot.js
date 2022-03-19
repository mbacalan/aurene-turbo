import { Client, Intents } from 'discord.js'

const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_TYPING
  ],
  partials: ['MESSAGE', 'REACTION']
})

bot.once('ready', () => {
  console.log('Connected to Discord!')
})

bot.login(process.env.NUXT_APP_CLIENT_TOKEN)

export { bot }
