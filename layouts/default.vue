<template>
  <v-app>
    <v-main>
      <v-header />
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import vHeader from '~/components/header.vue'
export default { components: { vHeader } }
</script>
