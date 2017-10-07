<template>
  <div class="main-site">
    <div class="site-header">
      <navbar></navbar>
    </div>
    <div class="site-content">
      <nuxt/>
    </div>
    <footer class="site-footer footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>LeMJ</strong> par <a href="http://saro-c.gt">Bastien Saro Chassetuillier</a>. Le code source et le contenu du site sont sous licence
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Licence Creative Commons - CC BY NC SA 4.0" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a>.
          </p>
          <p>
            <a class="icon" href="https://github.com/Teraglehn/LeMJ">
              <i class="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue'

  export default {
    components: {
      Navbar
    }
  }
</script>

<style scoped>
  .site-header {
    height: 3.25rem;
  }
  .main-site {
    min-height: 100vh;
    display: flex;
    flex-direction:column;
  }
  .site-content {
    flex-grow: 2;
  }
  .site-footer {
    margin-top: 1.5rem;
  }
</style>
