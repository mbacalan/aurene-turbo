<template>
  <section class="dashboard__general">
    <nick />
    <prefix />
    <activity />

    <notification />
  </section>
</template>

<script>
export default {
  name: 'GeneralConfig',
  layout: 'dashboard',
  middleware: ['auth']
}
</script>
