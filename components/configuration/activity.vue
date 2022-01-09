<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="activity"
            label="Activity Text"
            hide-details="auto"
            outlined
            dense
          />
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="activityType"
            :items="activityTypes"
            label="Activity Type"
            hide-details="auto"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-btn type="submit" color="primary" @click.prevent="setActivity">
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
  name: 'Activity',
  data () {
    return {
      activity: '',
      activityTypes: ['Playing', 'Streaming', 'Watching', 'Listening'],
      activityType: 'playing'
    }
  },
  computed: {
    ...mapState(['guild'])
  },
  methods: {
    async setActivity () {
      const response = await fetch(`http://localhost:8080/api/servers/${this.guild.id}/activity/`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ activity: this.activity, type: this.activityType }),
        credentials: 'include'
      })

      if (response.ok) {
        alert('Success')
      }
    }
  }
}
</script>
