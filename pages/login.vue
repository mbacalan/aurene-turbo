<template>
  <div class="login">
    Redirecting...
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted () {
    if (this.loggedIn && this.user) {
      return this.$router.push('/servers')
    }

    if (!this.loggedIn) {
      const discordUrl = new URL('https://discord.com/api/oauth2/authorize')
      const discordParams = new URLSearchParams()

      discordParams.set('client_id', process.env.NUXT_APP_CLIENT_ID)
      discordParams.set('redirect_uri', 'http://localhost:8080/')
      discordParams.set('response_type', 'code')
      discordParams.set('scope', 'identify guilds')

      window.location = `${discordUrl}?${discordParams}`
    }
  }
}
</script>

<style>
.login {
  text-align: center;
}
</style>
