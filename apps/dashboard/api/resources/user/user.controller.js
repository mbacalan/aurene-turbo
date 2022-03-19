import { bot } from '../../utils/bot'

class Controller {
  getUser (req, res) {
    if (!req.session.dUser) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    return res.json(req.session.dUser)
  }

  async getBot (_req, res) {
    const guilds = await bot.guilds.fetch()
    const stringifiedGuilds = JSON.parse(
      JSON.stringify(guilds, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    )

    const guildIds = stringifiedGuilds.map(g => g.id)

    return res.json(guildIds)
  }
}

export const UserController = new Controller()
