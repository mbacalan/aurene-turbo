<template>
  <div id="app">
    <div v-if="$fetchState.error || !loggedIn">
      <p>
        Welcome, Guest. Log in to gain access to the dashboard!
      </p>

      <NuxtLink to="/login">
        Log in
      </NuxtLink>
    </div>

    <div v-if="loggedIn">
      <div class="d-flex align-center mb-4">
        <h2>Welcome to Aurene Dashboard</h2>

        <div class="d-flex align-center ml-auto">
          <p class="mb-0 mr-4">
            {{ user.username }}#{{ user.discriminator }}
          </p>

          <v-avatar size="48">
            <img :src="user.avatar" :alt="user.username">
          </v-avatar>
        </div>
      </div>

      <p>Select a server below to manage Aurene on:</p>
    </div>

    <section v-if="loggedIn">
      <ul class="server-list">
        <li v-for="guild in botGuilds" :key="guild.id">
          <NuxtLink :to="guild.id">
            {{ guild.name }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      loginStatus: false,
      botGuilds: []
    }
  },
  async fetch () {
    try {
      this.loginStatus = await this.$axios.$get('http://localhost:3000/api/user')
    } catch (e) {
      return e
    }
  },
  computed: {
    ...mapState(['loggedIn', 'user', 'guild'])
  },
  watch: {
    loginStatus (newVal, oldVal) {
      this.$store.commit('login', newVal)
    }
  },
  async mounted () {
    if (!this.user.value) {
      return
    }
    const botGuilds = await this.$axios.$get('http://localhost:3000/api/user/bot')

    this.botGuilds = this.user.guilds.filter(
      guild => botGuilds.includes(guild.id)
    )
  }
}
</script>
