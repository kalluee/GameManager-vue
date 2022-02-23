<template>
  <div>

    <div v-if="displayAddNewCompetition">
      <input placeholder="Uue võistluse nimi" v-model="teamName">
      <button v-on:click="addNewTeam">Lisa uus meeskond</button>
    </div>

    <div v-if="displayEditTeamName">
      <input v-model="teamName">
      <button>Uuenda</button>
    </div>

    <br>
    <br>
    <br>

    <div v-if="displayAddPlayer">
      <br>
      <br>
      <input placeholder="eesnimi" v-model="newPlayer.player.firstName">
      <input placeholder="perekonnanimi" v-model="newPlayer.player.lastName">
      <input placeholder="vanus" v-model="newPlayer.player.age">
    </div>


  </div>
</template>

<script>
export default {
  name: "Admin",
  data: function () {
    return {
      competitionName: "",
      competitionId: 0,
      newGame: {
        competitionId: 0,
        game: {
          gameTypeId: 0,
          statusId: 0,
          name: "",
          date: function () {
            return Date.now();
          }
        }
      }
    }
  },
  methods: {
    addCompetition: function () {
      this.$http.post("/competition/add", this.newCompetition
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }

}
</script>

<style scoped>

</style>