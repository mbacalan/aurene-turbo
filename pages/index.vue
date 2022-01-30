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
      const response = await fetch('http://localhost:3000/api/user', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      credentials: 'include'
    })

    if (response.ok) {
      const user = await response.json()

      this.$store.commit('login', user)
    }

    if (!this.loggedIn && this.$route.query.code) {
      return this.login(this.$route.query.code)
    }
  },
  methods: {
    async login (code) {
      const response = await fetch('http://localhost:3000/api/auth/login/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ code }),
        credentials: 'include'
      })

      if (response.ok) {
        const user = await response.json()

        this.$store.commit('login', user)
        this.$router.push('/')
      }
    },
    async logout () {
      const request = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include'
      })

      if (request.ok) {
        this.$store.commit('logout')
        this.$router.push('/')
      }
    }
  }
}
</script>
