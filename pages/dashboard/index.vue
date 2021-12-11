<template>
  <section class="servers">
    <p v-if="!loggedIn">
      You must log in to see this page. Redirecting...
    </p>

    <div v-if="loggedIn">
      <p>
        Hello, {{ user.username }}! Please select a guild below.
      </p>

      <ul class="server-list">
        <li v-for="guild in user.guilds" :key="guild.id">
          <NuxtLink :to="'/dashboard/' + guild.id">
            {{ guild.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Servers',
  computed: {
    ...mapState(['loggedIn', 'user'])
  },
  mounted () {
    if (!this.loggedIn) {
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    }
  }

}
</script>
