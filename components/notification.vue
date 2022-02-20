<template>
  <div class="text-center ma-2">
    <v-snackbar :value="notification">
      {{ notification }}

      <template #action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="updateNotification(null)"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['notification'])
  },
  watch: {
    notification (newVal, oldVal) {
      if (newVal == null) {
        return
      }

      setTimeout(() => this.$store.commit('setNotification', null), 5000)
    }
  },
  methods: {
    updateNotification (message) {
      this.$store.commit('setNotification', message)
    }
  }
}
</script>
