<template>
  <v-form @submit.prevent="setNick">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="nick"
            label="Nickname"
            hide-details="auto"
            outlined
            dense
            required
          />
        </v-col>

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
  name: 'Nick',
  data () {
    return {
      loading: false,
      nick: this.$store.state.botUser.username
    }
  },
  computed: {
    ...mapState(['guild'])
  },
  methods: {
    async setNick () {
      this.loading = true

      const response = await fetch(`http://localhost:3000/api/servers/${this.guild.id}/nick/`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ nick: this.nick }),
        credentials: 'include'
      })

      if (response.ok) {
        alert('Success')
      }

      this.loading = false
    }
  }
}
</script>
