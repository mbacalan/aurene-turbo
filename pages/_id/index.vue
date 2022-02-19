<template>
  <section class="dashboard">
    <p v-if="!loggedIn">
      You must log in to see this page. Redirecting...
    </p>

    <div v-if="loggedIn">
      <p>
        Select from menu
      </p>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  layout: 'dashboard',
  middleware: ['auth'],
  computed: {
    ...mapState(['loggedIn', 'user', 'guild'])
  },
  async mounted () {
    const guild = this.user.guilds.find(guild => guild.id === this.$route.params.id)
    this.$store.commit('setGuild', guild)
    await this.setBotUser()
  },
  methods: {
    async setBotUser () {
      try {
        const data = await this.$axios.$get(`http://localhost:3000/api/servers/${this.guild.id}/config/`)

        this.$store.commit('setBotUser', data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
