<template>
  <v-form @submit.prevent="createPoll">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="title"
            label="Title"
            hide-details="auto"
            outlined
            dense
            required
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
            required
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-btn type="submit" color="primary" @click.prevent="addOption">
            Add
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="options.length">
        <v-col cols="12" sm="6">
          <transition-group name="poll-options" tag="ul">
            <li v-for="(option, index) in options" :key="option + index" class="d-flex">
              <p class="mr-auto">
                {{ pollEmojiUnicodes[index] }} - {{ option }}
              </p>

              <v-icon
                :disabled="index == 0"
                color="primary"
                @click="moveOption('up', index)"
              >
                mdi-arrow-up-box
              </v-icon>

              <v-icon
                :disabled="index == options.length - 1"
                color="primary"
                @click="moveOption('down', index)"
              >
                mdi-arrow-down-box
              </v-icon>

              <v-icon
                color="primary"
                @click="deleteOption(index)"
              >
                mdi-close-box
              </v-icon>
            </li>
          </transition-group>
        </v-col>
      </v-row>

      <v-row v-if="options.length">
        <v-col cols="12" sm="6">
          <discord-messages>
            <discord-message
              author="AureneBot"
              :bot="true"
              avatar="https://cdn.discordapp.com/avatars/400644240746479616/9bcbf1034b7db9cbfc4951eb46ffe9f4.webp?size=128"
            >
              <mention>everyone</mention>
              <discord-embed slot="embeds" :title="title">
                <p v-for="(option, index) in options" :key="option + index" class="mb-2">
                  {{ pollEmojiUnicodes[index] }} {{ option }}
                </p>
              </discord-embed>
            </discord-message>
          </discord-messages>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn type="submit" color="primary" :loading="loading">
            Create Poll
          </v-btn>

          <v-btn v-if="isFormDirty" type="submit" color="warning" @click="clearForm">
            Clear Form
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import { pollEmojiUnicodes } from '~/api/data/emoji'

export default {
  name: 'Poll',
  data () {
    return {
      loading: false,
      title: '',
      newOption: '',
      options: [],
      pollEmojiUnicodes
    }
  },
  computed: {
    ...mapState(['guild']),
    isFormDirty () {
      return !!((this.title.length || this.options.length))
    }
  },
  methods: {
    addOption () {
      if (!this.newOption) {
        return
      }

      this.options.push(this.newOption)
      this.newOption = ''
    },
    moveOption (direction, index) {
      this.options = this.options.map((element, i) => {
        if (direction == 'up' ? i == index - 1 : i == index) {
          return this.options[direction == 'up' ? index : index + 1]
        } else if (direction == 'up' ? i == index : i == index + 1) {
          return this.options[direction == 'up' ? index - 1 : index]
        } else {
          return element
        }
      })
    },
    deleteOption (index) {
      this.options.splice(index, 1)
    },
    clearForm () {
      this.title = ''
      this.newOption = ''
      this.options = []
    },
    async createPoll () {
      if (this.options.length <= 1) {
        return
      }

      this.loading = true

      const response = await fetch(`http://localhost:3000/api/servers/${this.guild.id}/poll/`, {
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

      this.clearForm()
      this.loading = false
    }
  }
}
</script>

<style>
  .poll-options-move {
    transition: transform 0.3s ease;
  }
</style>
