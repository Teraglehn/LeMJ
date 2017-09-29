<template>
  <div class="columns">
    <div class="column">
      <form @submit.prevent="postSheet">
        <div class="field">
          <label class="label">Nom</label>
          <div class="control">
            <input class="input" type="text" v-model="sheet.name">
          </div>
        </div>
      </form>
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
        sheet: {
          name: '',
          exp: 0,
          ath: 0,
          per: 0,
          aff: 0
        }
      }
    },
    methods: {
      postSheet: function () {
        axios.post('/api/rest/sheet', this.sheet)
          .then((response) => {
            this.$router.push(response.data._id)
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
