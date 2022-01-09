<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="prefix"
            label="Prefix"
            hide-details="auto"
            maxlength="1"
            outlined
            dense
          />
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-btn type="submit" color="primary" @click.prevent="setPrefix">
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
