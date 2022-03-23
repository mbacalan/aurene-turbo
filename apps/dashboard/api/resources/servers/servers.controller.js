import { MessageEmbed } from 'discord.js'
import database from 'database'
import { bot } from '../../utils/bot'
import { pollEmojis, pollEmojiUnicodes } from '../../data/emoji'

const { Guilds } = database

class Controller {
  getConfig (_req, res) {
    const botUser = {
      ...bot.user,
      activity: bot.user.presence
    }

    return res.json(botUser)
  }

  getChannels (req, res) {
    const guild = bot.guilds.cache.get(req.params.serverId)
    let channels = guild.channels.cache

    channels = channels.filter(c => c.type == 'GUILD_TEXT')

    return res.json(channels)
  }

  async setChannels (req, res) {
    const giveawayChannel = req.body.giveawayChannel
    const starboardChannel = req.body.starboardChannel

    try {
      const guild = await Guilds.findOne({ _id: req.params.serverId })

      guild.config.giveawayChannel = giveawayChannel
      guild.config.starboardChannel = starboardChannel
      guild.save()

      return res.sendStatus(200)
    } catch (error) {
      console.log(error)

      return res.sendStatus(500)
    }
  }

  async updateNick (req, res) {
    try {
      const data = await bot.user.setUsername(req.body.nick)

      return res.json(data)
    } catch (error) {
      console.log(error)

      return res.sendStatus(500)
    }
  }

  updateActivity (req, res) {
    let { activity, type } = req.body

    if (type.length) {
      type = type.toUpperCase()
    }

    try {
      const data = bot.user.setActivity(activity, { type: type || 'PLAYING' })

      return res.json(data)
    } catch (error) {
      console.log(error)

      return res.sendStatus(500)
    }
  }

  async createPoll (req, res) {
    const guild = bot.guilds.cache.get(req.params.serverId)
    const channel = bot.channels.cache.get(req.body.channel)

    if (!guild || !channel) {
      return res.sendStatus(500)
    }

    const { role, title, options } = req.body

    try {
      let matchingRole = null

      if (role && role[1] == 'everyone') {
        matchingRole = '@everyone'
      } else if (role) {
        matchingRole = guild.roles.cache.find(r => r.name.toLowerCase() === role[1].toLowerCase()) || null
      }

      const pollEmbed = new MessageEmbed().setTitle(title)
      const pollOptions = []

      for (let i = 0; i < options.length; i++) {
        pollOptions.push({ name: '\u200B', value: `${pollEmojis[i]} ${options[i]}` })
      }

      pollEmbed.addFields(pollOptions)

      const poll = await channel.send({ content: matchingRole, embeds: [pollEmbed] }).catch((err) => {
        throw new Error('Error sending message', err)
      })

      for (let i = 0; i < options.length; i++) {
        await poll.react(pollEmojiUnicodes[i])
      }

      return res.sendStatus(200)
    } catch (error) {
      console.log(error)

      return res.sendStatus(500)
    }
  }
}

export const ServerController = new Controller()
