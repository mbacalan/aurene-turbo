<template>
  <div class="prefix">
    <label>
      Prefix:
      <input v-model="prefix" type="text" maxlength="1">
    </label>

    <button type="submit" @click.prevent="setPrefix">
      Submit
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Prefix',
  data () {
    return {
      prefix: ''
    }
  },
  computed: {
    ...mapState(['guild'])
  },
  methods: {
    async setPrefix () {
      const response = await fetch(`http://localhost:8080/api/servers/${this.guild.id}/prefix/`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ prefix: this.prefix }),
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
