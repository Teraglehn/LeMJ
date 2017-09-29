<template>
  <div class="columns">
    <div class="column">
      créer campagne
      <a v-on:click="postCampaign()" class="button">Créer</a>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    middleware: 'auth',
    scrollToTop: true,
    data () {
      return {
      }
    },
    methods: {
      postCampaign: function () {
        axios.post('/api/rest/campaign', {name: 'ma campagne de test'})
          .then((response) => {
            console.log(response)
            this.$router.push('/application/campaign')
          })
          .catch((e) => {
            throw Error(e)
          })
      }
    }
  }
</script>

<style>
</style>
