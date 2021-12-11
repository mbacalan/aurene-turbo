<template>
  <div id="app">
    <h1 class="title">
      Aurene Dashboard
    </h1>

    <nav>
      <NuxtLink
        v-if="loggedIn"
        to="/dashboard"
      >
        Servers
      </NuxtLink>

      <a
        v-if="loggedIn"
        href="#"
        @click="logout"
      >
        Logout
      </a>

      <NuxtLink
        v-if="!loggedIn"
        to="/login"
      >
        Login
      </NuxtLink>
    </nav>

    <div v-if="loggedIn" class="user">
      Welcome {{ user.username }}#{{ user.discriminator }}
    </div>

    <div v-if="!loggedIn" class="guest">
      Welcome, Guest. Log in to gain access to the dashboard!
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['loggedIn', 'user'])
  },
  async beforeMount () {
    const response = await fetch('http://localhost:8080/api/user', {
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
      const response = await fetch('http://localhost:8080/api/auth/login/', {
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
        this.$router.push('servers')
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
        this.$router.push('home')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
