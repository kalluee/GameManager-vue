<template>
  <div>
    <h1>Rühmajuht</h1>
    <h3>Eesnimi </h3> <span>{{firstName}}</span>
    <h3>Perekonnanimi </h3> <span>{{lastName}}</span>
  </div>
</template>

<script>
export default {
  name: "TeamLead",
  data: function () {
    return {
      firstName: this.$route.query.firstName,
      lastName: this.$route.query.lastName
    }
  },
}
</script>

<style scoped>

</style>