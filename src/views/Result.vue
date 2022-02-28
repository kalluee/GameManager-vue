<template>
  <div>
    <br>
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

    <br>
    <div v-if="displayTimeScoreTable">
      <br>
      <br>
      <table>
        <tr>
          <th>Koht</th>
          <th>Rühma nimi</th>
          <th>Aeg sekundites</th>
          <th>Tulemus</th>
        </tr>
        <tr v-for="teamTime in allTeamTimes">
          <td></td>
          <td>{{teamTime.teamName}}</td>
          <td>{{teamTime.timeInSeconds}}</td>
          <td><input></td>
        </tr>
      </table>
      <br>
      <br>
      <button v-on:click="updateScores">Salvesta</button>

    </div>

  </div>
</template>

<script>
export default {
  name: "Result",
  data: function (){
    return {
      selectedGameId: 0,
      competitionName:"",
      competitionId: 0,
      allGamesInCompetition:{
        gameInCompetitionId: 0,
        competitionName:"",
        gameName:""
      },
      allTeamScores: {},
      allTeamTimes:{
        scoreId: 0,
        teamName: "",
        timeInSeconds: 0
      },
      allTeamRefereeScores:{
        scoreId: 0,
        teamName: "",
        timeInSeconds: 0,
        points: 0,
        refereeScore: 0
      },
      options:{},
      selectedCompetitionId: 0,
      allCompetitions:{},
      displayCompetitions: true,
      displayGames:false,
      displayScoreTable: false,
      displayTimeScoreTable: false

    }
  },
  beforeMount() {
    this.findAllCompetitions()
  },
  methods: {
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
      this.hideAllDivs()
      this.displayCompetitions = true
      this.displayGames = true
      this.displayTimeScoreTable = true
      this.gameTypeId = response.data.gameTypeId
      this.allTeamScores = response.data
      this.displayScoreTable = true
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  },
    findAllTeamTimesByGameId: function () {
      this.$http.get("/all/times/by/gameid", {
        params: {
          gameId: this.selectedGameId
        }
      }
      ).then(response => {
        this.allTeamTimes = response.data
        this.displayScoreTable = true

            console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    findAllTeamRefereeScoresByGameId: function () {
      this.$http.get("/all/referee/scores/by/gameid")
          .then(response => {
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
      this.displayScoreTable = false
      this.displayTimeScoreTable = false
    },
  }
}


</script>
