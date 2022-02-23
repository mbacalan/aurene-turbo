export default async function ({ store, route, redirect, $axios }) {
  try {
    const data = await $axios.$get('http://localhost:3000/api/user')

    store.commit('login', data)

    const guild = store.state.user.guilds.find(guild => guild.id === route.params.id)

    store.commit('setGuild', guild)
  } catch {
    redirect('/')
  }
}
