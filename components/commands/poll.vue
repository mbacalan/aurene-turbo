<template>
  <div class="poll">
    <label>
      Poll Title
      <input v-model="title" type="text" name="title">
    </label>

    <div class="flex">
      <label>
        Add Option
        <input v-model="newOption" type="text" name="option">
      </label>

      <button @click="addPollOption">
        Add
      </button>
    </div>

    <div>
      <p v-for="(option, index) in options" :key="index">
        {{ option }}
      </p>
    </div>

    <button type="submit" @click.prevent="createPoll">
      Create Poll
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Poll',
  data () {
    return {
      title: '',
      newOption: '',
      options: []
    }
  },
  computed: {
    ...mapState(['guild'])
  },
  methods: {
    addPollOption () {
      if (!this.newOption) {
        return
      }

      this.options.push(this.newOption)
      this.newOption = ''
    },
    async createPoll () {
      if (this.options.length <= 1) {
        return
      }

      const response = await fetch(`http://localhost:8080/api/servers/${this.guild.id}/poll/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ guild: this.guild.id, title: this.title, options: this.options }),
        credentials: 'include'
      })

      if (response.ok) {
        alert('Success')
      }
    }
  }
}
</script>
