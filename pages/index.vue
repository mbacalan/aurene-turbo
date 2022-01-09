<template>
  <div id="app">
    <div v-if="loggedIn" class="user">
      <p>
        Welcome, {{ user.username }}#{{ user.discriminator }}!
      </p>

      <p>Select a server below to manage Aurene on.</p>
    </div>

    <div v-if="!loggedIn" class="guest">
      <p>
        Welcome, Guest. Log in to gain access to the dashboard!
      </p>

      <NuxtLink
        v-if="!loggedIn"
        to="/login"
      >
        Log in
      </NuxtLink>
    </div>

    <section v-if="loggedIn" class="servers">
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
