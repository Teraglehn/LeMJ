<template>
  <div class="columns is-centered">
    <div class="column is-half-desktop">
      Bienvenu dans l'application
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
    scrollToTop: true,
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style>
</style>
