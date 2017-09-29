<template>
  <div class="columns is-centered">
    <div class="column is-half-desktop">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Bienvenue sur LeMJ
            </h1>
            <h2 class="subtitle">
              Connectez vous pour accéder à l'application
            </h2>
          </div>
        </div>
      </section>
      <form @submit.prevent="login">
        <div class="field">
          <label class="label">Identifiant</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="text" v-model="form.username">
            <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Mot de passe</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="password" v-model="form.password">
            <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
          </div>
        </div>
        <label class="checkbox">
          <input type="checkbox" v-model="form.remember">
          Remember me
        </label>
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <a v-on:click="login" class="button is-primary">
              Connexion
            </a>
          </p>
          <p v-on:click="register" class="control">
            <a class="button is-light">
              S'enregistrer
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'notauth',
    layout: 'index',
    head () {
      return {
        title: 'LeMJ - Connexion'
      }
    },
    scrollToTop: true,
    data () {
      return {
        form: {
          username: '',
          password: '',
          remember: false
        }
      }
    },
    methods: {
      async register () {
        try {
          await this.$store.dispatch('register', {
            username: this.form.username,
            password: this.form.password
          })
        } catch (e) {
        }
      },
      async login () {
        try {
          await this.$store.dispatch('login', {
            username: this.form.username,
            password: this.form.password,
            remember: this.form.remember
          })
          this.$router.push('application')
        } catch (e) {
        }
      }
    }
  }
</script>

<style>
</style>
