<template>
  <v-app-bar color="deep-purple accent-4" dense dark app clipped-left>
    <v-toolbar-title>
      <NuxtLink to="/">
        Aurene Dashboard
      </NuxtLink>
    </v-toolbar-title>

    <v-spacer />

    <v-btn v-if="loggedIn" icon @click="logout">
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState(['loggedIn'])
  },
  methods: {
    async logout () {
      const request = await fetch('http://localhost:3000/api/auth/logout', {
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

<style scoped>
a {
  color: #fff;
  text-decoration: none;
}
</style>
