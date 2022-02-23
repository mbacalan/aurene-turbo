<template>
  <v-app-bar color="deep-purple accent-4" dense dark app clipped-left>
    <v-app-bar-nav-icon v-if="onDashboard" @click.stop="toggleMenu" />

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
    ...mapState(['loggedIn', 'appMenu']),
    onDashboard () {
      return !!this.$route.params.id
    }
  },
  methods: {
    async logout () {
      try {
        await this.$axios.$post('http://localhost:3000/api/auth/logout')

        this.$store.commit('logout')
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    toggleMenu () {
      this.$store.commit('setAppMenu', !this.appMenu)
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
