<template>
  <div id="app">
    <div v-if="!loggedIn">
      <p>
        Welcome, Guest. Log in to gain access to the dashboard!
      </p>

      <NuxtLink v-if="!loggedIn" to="/login">
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

      <p>Select a server below to manage Aurene on.</p>
    </div>

    <section v-if="loggedIn">
      <ul class="server-list">
        <li v-for="guild in user.guilds" :key="guild.id">
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
  computed: {
    ...mapState(['loggedIn', 'user', 'guild'])
  },
  async beforeMount () {
    try {
      const data = await this.$axios.$get('http://localhost:3000/api/user')

      this.$store.commit('login', data)
    } catch {
      if (!this.loggedIn && this.$route.query.code) {
        this.login(this.$route.query.code)
      }
    }
  },
  methods: {
    async login (code) {
      try {
        const data = await this.$axios.$post(
          'http://localhost:3000/api/auth/login/',
          { code }
        )

        this.$store.commit('login', data)
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    },
    async logout () {
      try {
        await this.$axios.$post('http://localhost:3000/api/auth/logout')

        this.$store.commit('logout')
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
