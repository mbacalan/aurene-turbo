export const state = () => ({
  loggedIn: false,
  user: {},
  botUser: {},
  guild: ''
})

export const mutations = {
  login (state, user) {
    state.loggedIn = true
    state.user = user
  },
  logout (state) {
    state.loggedIn = false
    state.user = {}
  },
  setGuild (state, guild) {
    state.guild = guild
  },
  setBotUser (state, botUser) {
    state.botUser = botUser
  }
}
