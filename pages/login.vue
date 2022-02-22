<template>
  <div class="login">
    Redirecting...
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  computed: {
    ...mapState(['loggedIn'])
  },
  mounted () {
    if (this.loggedIn && this.user) {
      this.$router.push('/')
      return
    }

    if (!this.loggedIn && this.$route.query.code) {
      this.login(this.$route.query.code)
      return
    }

    const discordUrl = new URL('https://discord.com/api/oauth2/authorize')
    const discordParams = new URLSearchParams()

    discordParams.set('client_id', '400644240746479616')
    discordParams.set('redirect_uri', 'http://localhost:3000/login/')
    discordParams.set('response_type', 'code')
    discordParams.set('scope', 'identify guilds')

    window.location = `${discordUrl}?${discordParams}`
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
    }
  }
}
</script>
