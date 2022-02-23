<template>
  <div>
    <div v-if="displayCompetitionTable">
      <br>
      <h5>Vali võistlus</h5>
      <br>
      <select v-model="allCompetitions">
        <option v-for="competitionName in allCompetitions" value="competitionName">{{competitonName.name}}</option>
      </select>
      <br>
      <button v-on:click="displayGamesTable">Kinnita</button>

    </div>

    <div v-if="displayGamesTable">
      <br>
      <br>
      <table>
        <tr>
          <th>Mängu tüüp</th>
          <th>Mängu nimi</th>
          <th>Rühmade arv</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for="row in allGames">
          <td><input v-model="row.firstName"></td>
          <td><input v-model="row.lastName"></td>
          <td><input v-model="row.age"></td>
          <td>
            <button>Muuda</button></td>
        </tr>

      </table>
      <br>
      <button>Salvesta</button>

    </div>

  </div>
</template>

<script>
export default {
  name: "Referee",
  data: function () {
    return {
      competitonName:"",
      competitonId: 0,
      newGame:{
        competitionId: 0,
        game: {
          gameName:""
        }
      },

    // {
    //   "gameInCompetitionId": 0,
    //     "competitionName": "string",
    //     "gameName": "string"
    // }


      allCompetitions:{},
      allGames:{},

      displayCompetitionTable: true,
      displayGamesTable:false,

      firstName: this.$route.query.firstName,
      lastName: this.$route.query.lastName
    }
  },

  methods:{
    findAllCompetitions: function () {
      this.$http.get("/competition/get/all")
          .then(response => {
            this.allCompetitions = response.data
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },
    beforeMount() {
      this.findAllCompetitions()
    }
  }

}
</script>

<style scoped>

</style>