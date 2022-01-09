<template>
  <section class="dashboard">
    <p v-if="!loggedIn">
      You must log in to see this page. Redirecting...
    </p>

    <div v-if="loggedIn">
      <div class="d-flex align-center mb-8">
        <v-avatar size="48" class="mr-4">
          <img :src="user.avatar" :alt="user.username">
        </v-avatar>

        <p class="mb-0">
          {{ user.username }}#{{ user.discriminator }} on {{ guild.name }}
        </p>
      </div>

      <div class="mb-2">
        <h2 class="mb-4">
          General Configuration
        </h2>

        <nick />
        <prefix />
      </div>

      <div class="mb-2">
        <h2 class="mb-4">
          Activity Settings
        </h2>

        <activity />
      </div>

      <div class="mb-2">
        <h2 class="mb-4">
          Poll Creation
        </h2>

        <poll />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  middleware: ['auth'],
  computed: {
    ...mapState(['loggedIn', 'user', 'botUser', 'guild'])
  },
  async mounted () {
    const guild = this.user.guilds.find(guild => guild.id === this.$route.params.id)
    this.$store.commit('setGuild', guild)
    await this.getBotUser()
  },
  methods: {
    checkLogin () {
      if (!this.loggedIn) {
        setTimeout(() => {
          this.$router.push('/')
        }, 3000)
      }
    },
    async getBotUser () {
      const response = await fetch(`http://localhost:8080/api/servers/${this.guild.id}/config/`, {
        mode: 'cors',
        credentials: 'include'
      })

      if (response.ok) {
        const botUser = await response.json()
        this.$store.commit('setBotUser', botUser)
      }
    }
  }
}
</script>
