<template>
  <div class="columns">
    <div class="column">
      Voir une campagne
      <nuxt-link to="campaign/create">Créer</nuxt-link>
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
