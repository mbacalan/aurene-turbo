<template>
  <v-app>
    <v-header />

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import vHeader from '~/components/header.vue'

export default {
  components: { vHeader }
}
</script>
