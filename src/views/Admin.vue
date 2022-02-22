<template>
  <div>

<!--    <div v-if="displayAddNewCompetition">-->
<!--      <input placeholder="Uue meeskonna nimi" v-model="teamName">-->
<!--      <button v-on:click="addNewTeam">Lisa uus meeskond</button>-->
<!--    </div>-->

<!--    <div v-if="displayEditTeamName">-->
<!--      <input v-model="teamName">-->
<!--      <button>Uuenda</button>-->
<!--    </div>-->

<!--    <br>-->
<!--    <br>-->
<!--    <br>-->

<!--    <div v-if="displayAddPlayer">-->
<!--      <input placeholder="eesnimi" v-model="newPlayer.player.firstName">-->
<!--      <input placeholder="perekonnanimi" v-model="newPlayer.player.lastName">-->
<!--      <input placeholder="vanus" v-model="newPlayer.player.age">-->
<!--    </div>-->



  </div>
</template>

<script>
export default {
  name: "Admin",
  data: function (){
    return{
      firstName: this.$route.query.firstName,
      lastName: this.$route.query.lastName
    }
  },
  methods: {

  }

}
</script>

<style scoped>

</style>