<template>
  <section class="dashboard">
    <p v-if="!loggedIn">
      You must log in to see this page. Redirecting...
    </p>

    <div v-if="loggedIn">
      <p>
        Welcome to your dashboard, {{ user.username }}#{{ user.discriminator }}
      </p>

      <p>You are managing {{ guild.name }}</p>

      <section class="configuration">
        <nick />
        <prefix />
        <activity />
        <poll />
      </section>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapState(['loggedIn', 'user', 'guild'])
  },
  updated () {
    this.checkLogin()
  },
  mounted () {
    this.checkLogin()
    // this.getBotUser()

    const guild = this.user.guilds.find(guild => guild.id === this.$route.params.id)
    this.$store.commit('setGuild', guild)
  },
  methods: {
    checkLogin () {
      if (!this.loggedIn) {
        setTimeout(() => {
          this.$router.push('/')
        }, 3000)
      }
    }
    // async getBotUser () {
    //   const response = await fetch(`http://localhost:8080/servers/${this.guild.id}/config/`, {
    //     mode: 'cors',
    //     credentials: 'include'
    //   })

    //   if (response.ok) {
    //     const data = await response.json()
    //     console.log(data)
    //   }
    // }
  }
}
</script>
