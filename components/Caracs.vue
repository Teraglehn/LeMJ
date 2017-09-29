<template>
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
      <td>{{loc_sheet.ath}}</td>
      <td>--</td>
      <td>--</td>
    </tr>
    <tr>
      <td>(PER) Percéption</td>
      <td>{{loc_sheet.per}}</td>
      <td>--</td>
      <td>--</td>
    </tr>
    <tr>
      <td>(AFF) Affinité</td>
      <td>{{loc_sheet.aff}}</td>
      <td>--</td>
      <td>--</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: ['sheet'],
    computed: {
      loc_sheet: function () {
        return this.sheet
      }
    }
  }
</script>

<style>
</style>
