<template>
  <v-form @submit.prevent="setChannels">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-alert type="info">
            For organization purposes, giveaways must have a dedicated channel.
            <br>
            If there is no channel selected, giveaway commands will not work!
          </v-alert>

          <!-- TODO: Show current selected channel -->

          <v-select
            v-model="giveawayChannel"
            :items="channels"
            item-text="name"
            item-value="id"
            label="Giveaway Channel"
            hide-details="auto"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-alert type="info">
            Starboard channel is where messages that received a certain amount of reactions will be posted to.
          </v-alert>

          <!-- TODO: Show current selected channel -->

          <v-select
            v-model="starboardChannel"
            :items="channels"
            item-text="name"
            item-value="id"
            label="Starboard Channel"
            hide-details="auto"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-btn type="submit" color="primary" :loading="loading">
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Channels',
  data () {
    return {
      loading: false,
      channels: [],
      giveawayChannel: '',
      starboardChannel: ''
    }
  },
  computed: {
    ...mapState(['guild'])
  },
  async mounted () {
    // TODO: Should be GET, but using POST to get guild id
    try {
      const data = await this.$axios.$get(
        `http://localhost:3000/api/servers/${this.guild.id}/channels/`
      )

      this.channels = data
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async setChannels () {
      this.loading = true

      try {
        await this.$axios.$patch(
          `http://localhost:3000/api/servers/${this.guild.id}/channels/`,
          {
            giveawayChannel: this.giveawayChannel,
            starboardChannel: this.starboardChannel
          }
        )

        this.$store.commit('setNotification', 'Channels Set!')
      } catch (err) {
        console.log(err)
        this.$store.commit('setNotification', 'Error setting channels!')
      }

      this.loading = false
    }
  }
}
</script>
