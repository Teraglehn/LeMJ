<template>
  <div class="columns">
    <div class="column">
      listes des Campagnes
      <nuxt-link to="campaign/create">Créer</nuxt-link>
      <p v-for="campaign in campaigns">
        {{ campaign.name }}
      </p>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    middleware: 'auth',
    scrollToTop: true,
    asyncData () {
      return axios.get(`/api/rest/campaign`)
        .then((res) => {
          return {campaigns: res.data}
        })
        .catch((e) => {
          throw Error(e)
        })
    }
  }
</script>

<style>
</style>
