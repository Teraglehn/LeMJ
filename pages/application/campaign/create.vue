<template>
  <div>
    <div class="columns">
      <div class="column">
        <section class="hero is-dark is-bold">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Créer une nouvelle campagne
              </h1>
              <h2 class="subtitle">
                Devenez un MJ !
              </h2>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column is-one-third-desktop">
          <form @submit.prevent="postCampaign()">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Nom</label>
              </div>
              <div class="field-body">
                <div class="control">
                  <input class="input" type="text" v-model="form.name" placeholder="Ma campagne">
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">Visibilité</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label class="radio">
                      <input type="radio" name="visibility" v-bind:value="true"  v-model="form.visibility">
                      Publique
                    </label>
                    <label class="radio">
                      <input type="radio" name="visibility" v-bind:value="false"  v-model="form.visibility">
                      Privée
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">Rejoindre</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label class="radio">
                      <input type="radio" name="join" v-bind:value="true" v-model="form.join">
                      Ouvert
                    </label>
                    <label class="radio">
                      <input type="radio" name="join" v-bind:value="false" v-model="form.join">
                      Par invitation
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">

              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <a class="button is-primary" v-on:click="postCampaign()">
                      Créer
                    </a>
                  </p>
                  <p class="control">
                    <a class="button is-light" v-on:click="cancel()">
                      Annuler
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
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
        form: {
          name: '',
          visibility: true,
          join: true,
          players: [],
          sessions: [],
          mj: ''
        }
      }
    },
    head () {
      return {
        title: 'LeMJ - Créer une campagne'
      }
    },
    methods: {
      postCampaign: function () {
        this.form.mj = this.$store.state.authUser._id
        axios().post('/api/rest/campaigns', this.form)
          .then((response) => {
            this.$router.push('/application/campaign')
          })
          .catch((e) => {
            throw Error(e)
          })
      },
      cancel: function () {
        this.$router.push('/application/campaign')
      }
    }
  }
</script>

<style>
</style>
