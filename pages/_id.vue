<template>
  <section class="dashboard">
    <p v-if="!loggedIn">
      You must log in to see this page. Redirecting...
    </p>

    <div v-if="loggedIn">
      <v-navigation :menus="menus" />

      <div v-for="(menu, index) in menus" :key="index">
        <div v-if="activeMenu == index" class="mb-2">
          <h2 class="mb-4">
            {{ menu.title }}
          </h2>

          <component
            :is="component"
            v-for="component in menu.components"
            :key="component"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import vNavigation from '~/components/navigation.vue'

export default {
  name: 'Dashboard',
  components: { vNavigation },
  middleware: ['auth'],
  data () {
    return {
      menus: [
        {
          title: 'General',
          icon: 'mdi-application-cog',
          components: ['nick', 'prefix']
        },
        {
          title: 'Activity',
          icon: 'mdi-account-cog',
          components: ['activity']
        },
        {
          title: 'Poll',
          icon: 'mdi-poll',
          components: ['poll']
        }
      ]
    }
  },
  computed: {
    ...mapState(['loggedIn', 'user', 'guild', 'activeMenu'])
  },
  async mounted () {
    const guild = this.user.guilds.find(guild => guild.id === this.$route.params.id)
    this.$store.commit('setGuild', guild)
    await this.setBotUser()
  },
  methods: {
    async setBotUser () {
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
