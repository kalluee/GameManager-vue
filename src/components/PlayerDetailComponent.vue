<template>
<div>
  <table>
    <tr>
      <th>Eesnimi</th>
      <th>Perekonnanimi</th>
      <th>Vanus</th>
    </tr>
    <tr v-for="row in players">
      <td>{{ row.firstName }}</td>
      <td>{{ row.lastName }}</td>
      <td>{{ row.age }}</td>
    </tr>
  </table>

</div>
</template>

<script>
export default {
  name: "PlayerDetailComponent",
  props:{
    players:{}
  }
}
</script>
