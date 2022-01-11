<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="title"
            label="Title"
            hide-details="auto"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="newOption"
            label="Option"
            hide-details="auto"
            outlined
            dense
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-btn type="submit" color="primary" @click.prevent="addPollOption">
            Add
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="options.length">
        <v-col cols="6">
          <div v-for="(option, index) in options" :key="index" class="d-flex">
            <p class="mr-auto">
              {{ index + 1 }} - {{ option }}
            </p>

            <v-icon @click="deletePollOption(index)">
              mdi-close
            </v-icon>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn type="submit" color="primary" @click.prevent="createPoll">
            Create Poll
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
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
    deletePollOption (index) {
      this.options.splice(index, 1)
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
