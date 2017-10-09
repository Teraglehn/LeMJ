<template>
  <div class="columns is-gapless is-centered login-container">
    <div class="column is-12-mobile is-half-tablet is-3-widescreen login-box">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Bienvenue sur LeMJ
            </h1>
            <h2 class="subtitle">
              Votre application de Jeux de Rôle !
            </h2>
          </div>
        </div>
      </section>
      <div class="tabs is-boxed is-fullwidth">
        <ul>
          <li :class="{'is-active': mode === 'login'}" v-on:click="mode = 'login'">
            <a>
              <span class="icon is-small"><i class="fa fa-user"></i></span>
              <span>Se connecter</span>
            </a>
          </li>
          <li :class="{'is-active': mode === 'register'}" v-on:click="mode = 'register'">
            <a>
              <span class="icon is-small"><i class="fa fa-sign-in"></i></span>
              <span>S'enregistrer</span>
            </a>
          </li>
        </ul>
      </div>
      <section class="form-box">
        <Login v-show="mode === 'login'"></Login>
        <Register v-show="mode === 'register'"></Register>
      </section>
    </div>
  </div>
</template>

<script>
  import Login from '../components/Login.vue'
  import Register from '../components/Register.vue'

  export default {
    components: {
      Login,
      Register
    },
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
        mode: 'login'
      }
    }
  }
</script>

<style>
  .login-container {
    max-width: 100vw;
    min-height: 100vh;
    padding: 50px 0;
    display: flex;
    flex-direction:column;
    align-items: center;
  }
  .login-box {
    max-width:100%;
    background-color: white;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
  }

  .form-box {
    padding: 10px;
  }
</style>
