<template>
  <section class="dashboard__poll">
    <poll />

    <notification />
  </section>
</template>

<script>
export default {
  name: 'PollConfig',
  layout: 'dashboard',
  middleware: ['auth']
}
</script>
