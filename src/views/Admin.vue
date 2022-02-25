<template>
  <div>

    <div v-if="displayAddNewCompetition">
      <input placeholder="Uue võistluse nimi" v-model="competitionName">
      <button v-on:click="addNewCompetition">Lisa uus võistlus</button>
    </div>


    <div v-if="displayEditCompetitionName">
      <input v-model="competitionName">
      <button>Muuda</button>
    </div>

    <div v-if="displayAddGame">

      <h5>Lisa mäng</h5>
      <br>
      <select v-model="selectedGameTypeId">
        <option v-for="gameType in gameTypes" :value="gameType.id">{{ gameType.name }}</option>
      </select>

      <br>
      <input placeholder="Mängu nimi" v-model="gameName">
      <br>
      <button v-on:click="addNewGame">Loo uus mäng</button>
    </div>


    <div v-if="displayGamesTable">
      <table>
        <tr>
          <th>Tüüp</th>
          <th>Mängu nimi</th>
        </tr>

        <tr v-for="row in allGames">

          <td><input v-model="row.gameTypeName"></td>
          <td><input v-model="row.gameName"></td>

          <td><button>Muuda nime</button></td>
          <td><button>x</button></td>

        </tr>
        <br>
      </table>
      <br>
      <button>Salvesta</button>
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
      gameName: "",
      allGames: {},

      newGame: {
        competitionId: 0,
        gameName: "",
        gameTypeId: 0,
        gameTypeName: ""

      },
      options: {},
      gameTypes: [],
      selectedGameTypeId: 0,
      displayAddNewCompetition: true,
      displayEditCompetitionName: false,
      displayAddGame: false,
      displayGamesTable: false,

      date: function () {
        return Date.now();
      }
    }
  },

  methods: {

    addNewCompetition: function () {
      this.$http.post("/competition/add", null, {
            params: {
              competitionName: this.competitionName
            }
          }
      ).then(response => {
        this.hideAllDivs()
        this.displayEditCompetitionName = true
        this.displayAddGame = true
        this.competitionId = response.data.id
        sessionStorage.setItem('competitionId', this.competitionId)
      }).catch(error => {
        alert(error)
        console.log(error)
      })
    },

    getAllGameTypes: function () {
      this.$http.get("/game/get/all/game/type")
          .then(response => {
            this.gameTypes = response.data
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },

    addNewGame: function () {
      this.newGame.competitionId = sessionStorage.getItem("competitionId")
      this.newGame.gameTypeId = this.selectedGameTypeId
      this.newGame.gameName = this.gameName
      this.$http.post("/game/add/game", this.newGame
      ).then(response => {
        this.displayGamesTable = true
        this.findGamesInCompetition()
      }).catch(error => {
        alert(error)
      })
    },

    findGamesInCompetition: function () {
      this.$http.get("/competition/game/all", {
            params: {
              competitionId: this.competitionId
            }
          }
      ).then(response => {
        this.allGames = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    hideAllDivs: function () {
      this.displayAddNewCompetition = false
      this.displayEditCompetitionName = false
      this.displayAddGame = false
      this.displayGamesTable = false
    }
  },
  beforeMount() {
    this.getAllGameTypes()
  }
}
</script>

<style scoped>

</style>