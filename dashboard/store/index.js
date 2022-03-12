export const state = () => ({
  loggedIn: false,
  user: {},
  botUser: {},
  guild: '',
  appMenu: true,
  activeMenu: 0,
  notification: null
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
  },
  setAppMenu (state, menu) {
    state.appMenu = menu
  },
  setActiveMenu (state, menu) {
    state.activeMenu = menu
  },
  setNotification (state, message) {
    state.notification = message
  }
}
