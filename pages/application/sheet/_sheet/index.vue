<template>
  <div>
    <div class="columns">
      <div class="column is-3-desktop is-12-mobile">
        <h1 class="title is-4">{{sheet.name}}</h1>
        <p>
          <strong>Expérience : </strong> {{ getExp() }}
        </p>
        <form @submit.prevent="addExp()">
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="number" v-model.number="mod.exp">
            </div>
            <div class="control">
              <a v-on:click="addExp()" class="button is-info">
                <span class="icon"><i class="fa fa-plus"></i></span>
              </a>
            </div>
          </div>
        </form>
      </div>
      <div class="column">
        <table class="table">
          <thead>
          <tr>
            <th>Carac.</th>
            <th>Valeur</th>
            <th>Modif.</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>(ATH) Atlétisme</td>
            <td>{{sheet.ath}}</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>(PER) Percéption</td>
            <td>{{sheet.per}}</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>(AFF) Affinité</td>
            <td>{{sheet.aff}}</td>
            <td>--</td>
            <td>--</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import sheet from '~/plugins/sheet'
  import Caracs from '~/components/Caracs'

  export default {
    components: {
      caracs: Caracs
    },
    middleware: 'auth',
    scrollToTop: true,
    asyncData ({ params }) {
      return axios.get(`/api/rest/sheet/` + params.sheet)
        .then((res) => {
          return {sheet: res.data}
        })
        .catch((e) => {
          throw Error(e)
        })
    },
    data () {
      return {
        mod: {
          exp: 0
        }
      }
    },
    methods: {
      getExp: function () {
        return this.sheet.exp - sheet.getExp(this.sheet)
      },
      addExp: function () {
        return axios.put(`/api/rest/sheet/` + this.sheet._id, {exp: this.sheet.exp + this.mod.exp})
          .then((res) => {
            this.sheet = res.data
            this.mod.exp = 0
          })
          .catch((e) => {
            this.mod.exp = 0
            throw Error(e)
          })
      }
    }
  }
</script>

<style>
</style>
