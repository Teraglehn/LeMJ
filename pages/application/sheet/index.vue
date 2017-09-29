<template>
  <div class="columns">
    <div class="column">
      <a href="sheet/create" class="button">Créer une feuille de personnage</a>
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
