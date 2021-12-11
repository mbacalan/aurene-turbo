<template>
  <div class="nick">
    <label>
      Nick:
      <input v-model="nick" type="text" maxlength="20">
    </label>

    <button type="submit" @click.prevent="setNick">
      Submit
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Nick',
  data () {
    return {
      nick: ''
    }
  },
  computed: {
    ...mapState(['guild'])
  },
  methods: {
    async setNick () {
      const response = await fetch(`http://localhost:8080/api/servers/${this.guild.id}/nick/`, {
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
    }
  }
}
</script>

<style>

</style>
