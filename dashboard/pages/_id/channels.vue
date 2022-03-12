
<template>
  <section class="dashboard__general">
    <p v-if="!guild.owner">
      You don't have permission for these settings.
    </p>

    <div v-if="guild.owner">
      <channels />
    </div>

    <notification />
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ChannelsConfig',
  layout: 'dashboard',
  middleware: ['auth'],
  computed: {
    ...mapState(['guild'])
  }
}
</script>
