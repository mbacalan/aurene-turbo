<template>
  <v-navigation-drawer app bottom clipped>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          {{ guild.name }}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ user.username }}#{{ user.discriminator }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list dense nav>
      <v-list-item-group color="primary" mandatory>
        <v-list-item
          v-for="(menu) in menus"
          :key="menu.title"
          nuxt
          :to="`/${guild.id}/${menu.title.toLowerCase()}`"
        >
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ menu.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Navigation',
  data () {
    return {
      menus: [
        {
          title: 'General',
          icon: 'mdi-application-cog'
        },
        {
          title: 'Poll',
          icon: 'mdi-poll'
        }
      ]
    }
  },
  computed: {
    ...mapState(['user', 'guild', 'activeMenu'])
  },
  methods: {
    setActiveMenu (menu) {
      this.$store.commit('setActiveMenu', menu)
    }
  }
}
</script>
