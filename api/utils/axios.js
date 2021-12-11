const axios = require('axios')

const userHttpClient = axios.create({
  baseURL: 'https://discord.com/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const botHttpClient = axios.create({
  baseURL: 'https://discord.com/api',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: `Bot ${process.env.NUXT_APP_CLIENT_TOKEN}`
  }
})

module.exports = {
  userHttpClient,
  botHttpClient
}
