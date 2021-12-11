<template>
  <div class="activity">
    <label>
      Activity:
      <input v-model="activity" type="text">
    </label>

    <label>
      Activity Type:
      <select v-model="activityType" name="activity_type">
        <option disabled>Pick One</option>
        <option value="playing" selected>PLAYING</option>
        <option value="streaming">STREAMING</option>
        <option value="watching">WATCHING</option>
        <option value="listening">LISTENING</option>
      </select>
    </label>

    <button type="submit" @click.prevent="setActivity">
      Submit
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Activity',
  data () {
    return {
      activity: '',
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

<style>

</style>
