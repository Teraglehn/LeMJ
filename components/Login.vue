<template>
  <form v-on:submit.prevent="login">
    <div class="notification" :class="{'is-danger': message.type === 'error'}" v-for="message in messages">
      {{message.message}}
    </div>
    <div class="field">
      <label class="label">Identifiant</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" v-model="form.username"
               :class="{'is-danger': $v.form.username.$error}" @blur="$v.form.username.$touch()" @keyup.enter="login">
        <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
      </div>
      <div v-show="$v.form.username.$error">
        <p v-show="!$v.form.username.required" class="help is-danger">L'identifiant doit être renseigné !</p>
      </div>
    </div>
    <div class="field">
      <label class="label">Mot de passe</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="password" v-model="form.password"
               :class="{'is-danger': $v.form.password.$error}" @blur="$v.form.password.$touch()" @keyup.enter="login">
        <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
      </div>
      <div v-show="$v.form.password.$error">
        <p v-show="!$v.form.password.required" class="help is-danger">L'identifiant doit être renseigné !</p>
      </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <a v-on:click="login" v-bind:disabled="$v.form.$invalid" class="button is-primary">
          Connexion
        </a>
      </p>
    </div>
  </form>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'

  export default {
    data: function () {
      return {
        form: {
          username: '',
          password: '',
          remember: false
        },
        messages: []
      }
    },
    validations: {
      form: {
        username: {
          required
        },
        password: {
          required
        }
      }
    },
    methods: {
      async login () {
        this.$v.form.$touch()
        if (!this.$v.form.$invalid) {
          try {
            await this.$store.dispatch('login', {
              username: this.form.username,
              password: this.form.password,
              remember: this.form.remember
            })
            this.$router.push('application')
          } catch (error) {
            if (error.status === 401 && error.data.message) {
              this.messages.push({
                'type': 'error',
                'message': error.data.message
              })
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
</style>
