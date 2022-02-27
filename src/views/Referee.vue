<template>
  <div>

    <div v-if="displayCompetitions">
      <br>
      <h5>Vali võistlus</h5>
      <select v-model="selectedCompetitionId" v-on:change="findCompetitionGames">
        <option disabled value = "0">Võistlus</option>
        <option v-for="competition in allCompetitions" :value="competition.id">{{competition.name}}</option>
      </select>
      <br>
      <br>
    </div>

    <div v-if="displayGames">
      <br>
      <h5>Vali mäng</h5>
      <select v-model="selectedGameId" v-on:change="findAllTeamsByGameId">
        <option disabled value="0">Mängud</option>
        <option v-for="game in allGamesInCompetition" :value="game.gameInCompetitionId">{{game.gameName}}</option>
      </select>
      <br>
      <br>
    </div>

    <div v-if="displayTeamsTable">
      <br>
      <br>
      <table>
        <tr>
          <th>Meeskonna nimi</th>
          <th v-if="gameTypeId == 1">Aeg sekundites</th>
          <th v-if="gameTypeId == 2">punktid</th>
          <th>tulemus</th>
        </tr>
        <tr v-for="score in allTeamScores">
          <td>{{score.teamName}}</td>
          <td v-if="gameTypeId == 1"><input v-model="score.timeInSeconds"></td>
          <td v-if="gameTypeId == 2"><input v-model="score.refereeScore"></td>
          <td><input v-model="score.points"></td>
        </tr>
      </table>
      <br>
      <br>
      <button v-on:click="updateScores">Salvesta muudatused</button>



    </div>

  </div>
</template>

<script>
export default {
  name: "Referee",
  data: function () {
    return {
      competitionName:"",
      competitionId: 0,
      gameTypeId: 0,
      allGamesInCompetition:{
        gameInCompetitionId: 0,
        competitionName:"",
        gameName:""
      },
      allTeamScores: {},
      options:{},
      selectedCompetitionId: 0,
      selectedGameId: 0,
      allCompetitions:{},
      displayCompetitions: true,
      displayGames:false,
      displayTeamsTable: false

    }
  },
  beforeMount() {
    this.findAllCompetitions()
  },
  methods:{
    findAllCompetitions: function () {
      this.$http.get("/competition/get/all")
          .then(response => {
            this.hideAllDivs()
            this.displayCompetitions = true
            this.allCompetitions = response.data
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },

    findCompetitionGames: function () {
      this.$http.get("/competition/game/all", {
            params: {
              competitionId: this.selectedCompetitionId
            }
          }
      ).then(response => {
        this.hideAllDivs()
        this.displayCompetitions = true
        this.displayGames = true
        this.allGamesInCompetition = response.data
        this.newGame.competitionId = this.selectedCompetitionId
        this.newGame.game.gameName = this.gameName
      }).catch(error => {
        console.log(error)
      })
    },
    findAllTeamsByGameId: function () {
      this.$http.get("/score/all/teams/by/gameid", {
            params: {
              gameId: this.selectedGameId
            }
          }
      ).then(response => {
        this.gameTypeId = response.data.gameTypeId
        this.allTeamScores = response.data.scoreDetails
        this.displayTeamsTable = true
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    updateScores: function () {
      this.$http.put("/score/scores", this.allTeamScores
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },



    hideAllDivs: function () {
      this.displayCompetitions = false
      this.displayGames = false
      this.displayTeamsTable = false
    },
  }

}
</script>

<style scoped>

</style>