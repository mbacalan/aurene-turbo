<template>
  <v-app>
    <v-header />

    <v-main>
      <v-container>
        <navigation />

        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import vHeader from '~/components/header.vue'
import Navigation from '~/components/navigation.vue'

export default {
  components: { vHeader, Navigation }
}
</script>
