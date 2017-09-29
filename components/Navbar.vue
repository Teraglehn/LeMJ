<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a href="/application" class="navbar-item">
          LeMJ
        </a>

        <button class="button navbar-burger is-dark" v-bind:class="{'is-active': burger}" v-on:click="openBurger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu" v-bind:class="{'is-active': burger}">
        <div class="navbar-start">
          <a href="/application/campaign" class="navbar-item">
            Campagnes
          </a>
          <a href="/application/sessions" class="navbar-item">
            Parties
          </a>
          <a href="/application/sheet" class="navbar-item">
            Feuilles
          </a>
        </div>

        <div class="navbar-end">
          <a v-on:click="logout" class="navbar-item">
            <i class="fa fa-sign-out"></i> Déconnexion
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    data: function () {
      return {
        burger: false,
        dropdown: {
          campaign: false
        }
      }
    },
    methods: {
      openBurger: function () {
        this.burger = !this.burger
      },
      toggle: function (target) {
        this.dropdown[target] = !this.dropdown[target]
      },
      async logout () {
        try {
          await this.$store.dispatch('logout')
          this.$router.push('/')
        } catch (e) {
        }
      }
    }
  }
</script>

<style>
</style>
