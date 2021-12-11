const { userHttpClient } = require('../../utils/axios')

class Controller {
  async login (req, res) {
    if (!req.body.code) {
      return res.sendStatus(401)
    }

    this.data = new URLSearchParams({
      client_id: process.env.NUXT_APP_CLIENT_ID,
      client_secret: process.env.NUXT_APP_CLIENT_SECRET,
      code: req.body.code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:8080/',
      scope: 'identify guilds'
    })

    try {
      const { data: tokens } = await userHttpClient.post(
        '/oauth2/token',
        this.data
      )

      const { data: user } = await userHttpClient.get('/users/@me',
        {
          headers: {
            authorization: `${tokens.token_type} ${tokens.access_token}`
          }
        }
      )

      let { data: guilds } = await userHttpClient.get('/users/@me/guilds',
        {
          headers: {
            authorization: `${tokens.token_type} ${tokens.access_token}`
          }
        }
      )

      guilds = guilds.filter(guild => guild.owner == true)

      req.session.dTokens = tokens
      req.session.dUser = {
        ...user,
        guilds
      }

      return res.json(req.session.dUser)
    } catch (err) {
      console.log(err)

      return res.sendStatus(500)
    }
  }

  logout (req, res) {
    req.session.dTokens = null
    req.session.dUser = null

    return res.sendStatus(200)
  }
}

module.exports = new Controller()
