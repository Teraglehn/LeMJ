<template>
  <form @submit.prevent="register">
    <div class="notification" :class="{'is-success': message.type === 'success'}" v-for="message in messages">
      {{message.message}}
    </div>
    <div class="field">
      <label class="label">Identifiant</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" name="username" type="text" v-model="form.username"
               :class="{'is-danger': $v.form.username.$error}" @blur="$v.form.username.$touch()">
        <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
      </div>
      <p class="help">Format alpha-numérique, au moins {{$v.form.username.$params.minLength.min}} caractères</p>
      <div v-show="$v.form.username.$error">
        <p v-show="!$v.form.username.required" class="help is-danger">L'identifiant doit être renseigné !</p>
        <p v-show="!$v.form.username.alphaNum" class="help is-danger">L'identifiant doit être au format alpha-numérique !</p>
        <p v-show="!$v.form.username.minLength" class="help is-danger">L'identifiant doit faire au moins {{$v.form.username.$params.minLength.min}} caractères !</p>
      </div>
      <p v-if="errors.username && errors.username.value === form.username" class="help is-danger">{{ errors.username.msg }}</p>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" name="email" type="email" v-model="form.email"
               :class="{'is-danger': $v.form.email.$error}" @blur="$v.form.email.$touch()">
        <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
      </div>
      <div v-show="$v.form.email.$error">
        <p v-show="!$v.form.email.required" class="help is-danger">L'email doit être renseigné !</p>
        <p v-show="!$v.form.email.email" class="help is-danger">L'email n'est pas valide !</p>
      </div>
    </div>
    <div class="field">
      <label class="label">Mot de passe</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" name="password" type="password" v-model="form.password"
               :class="{'is-danger': $v.form.password.$error}" @blur="$v.form.password.$touch()">
        <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
      </div>
      <p class="help">Au moins {{$v.form.password.$params.minLength.min}} caractères</p>
      <div v-show="$v.form.password.$error">
        <p v-show="!$v.form.password.required" class="help is-danger">Le mot de passe doit être renseigné !</p>
        <p v-show="!$v.form.password.minLength" class="help is-danger">Le mot de passe doit faire au moins {{$v.form.password.$params.minLength.min}} caractères !</p>
      </div>
    </div>
    <div class="field">
      <label class="label">Confirmation du mot de passe</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" name="passwordConfirm" type="password" v-model="form.passwordConfirm"
               :class="{'is-danger': $v.form.passwordConfirm.$error}" @blur="$v.form.passwordConfirm.$touch()">
        <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
      </div>
      <div v-show="$v.form.passwordConfirm.$error">
        <p v-show="!$v.form.passwordConfirm.required" class="help is-danger">Le mot de passe doit être renseigné !</p>
        <p v-show="!$v.form.passwordConfirm.sameAsPassword" class="help is-danger">Les mots de passes doivent être identique !</p>
      </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <a v-on:click="register()" class="button is-primary" v-bind:disabled="$v.form.$invalid" :class="{'is-loading':loading}">
          S'enregistrer
        </a>
      </p>
    </div>
  </form>
</template>

<script>
  import { required, minLength, alphaNum, email, sameAs } from 'vuelidate/lib/validators'
  export default {
    data: function () {
      return {
        form: {
          username: '',
          password: '',
          passwordConfirm: '',
          email: ''
        },
        loading: false,
        errors: {},
        messages: []
      }
    },
    validations: {
      form: {
        username: {
          required,
          alphaNum,
          minLength: minLength(4)
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8)
        },
        passwordConfirm: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    },
    methods: {
      async register () {
        try {
          this.loading = true
          this.messages = []
          let response = await this.$store.dispatch('register', {
            username: this.form.username,
            password: this.form.password,
            email: this.form.email
          })
          this.$v.form.$reset()
          this.errors = {}
          this.form = {
            username: '',
            password: '',
            passwordConfirm: '',
            email: ''
          }
          this.messages.push({
            'type': 'success',
            'message': response.message
          })
          this.loading = false
        } catch (err) {
          this.loading = false
          this.errors = err.errors
        }
      }
    }
  }
</script>

<style scoped>
</style>
