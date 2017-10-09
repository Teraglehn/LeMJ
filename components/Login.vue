<template>
  <form v-on:submit.prevent="login">
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
      Connexion automatique
    </label>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <a v-on:click="login" class="button is-primary">
          Connexion
        </a>
      </p>
    </div>
  </form>
</template>

<script>
  export default {
    data: function () {
      return {
        form: {
          username: '',
          password: '',
          remember: false
        }
      }
    },
    methods: {
      async login () {
        try {
          let response = await this.$store.dispatch('login', {
            username: this.form.username,
            password: this.form.password,
            remember: this.form.remember
          })
          console.log(response)
          // this.$router.push('application')
        } catch (e) {
        }
      }
    }
  }
</script>

<style scoped>
</style>
