<template>
  <div>
    <div v-if="displayChooseAction">

      <button v-on:click="openAddNewCompetition">Lisa uus sündmus</button>
      <button v-on:click="openChooseCompetition">Lisa mäng olemasolevale sündmusele</button>

    </div>
    <br>
    <br>

    <div v-if="displayAddNewCompetition">
      <input placeholder="Uue sündmuse nimi" v-model="competitionName">
      <button v-on:click="addNewCompetition">Lisa uus sündmus</button>
    </div>

    <div v-if="displayEditCompetitionName">
      <input v-model="competitionName">
      <button>Muuda</button>
    </div>

    <div v-if="displayChooseGame">
      <br>
      <h3>Vali sündmus</h3>
      <br>

      <select v-model="selectedCompetitionId">
        <option v-for="competition in availableCompetitions" :value="competition.id">{{ competition.name }}</option>
      </select>
      <br>
      <br>
      <button v-on:click="displayGamesInCompetition">Vali sündmus</button>
    </div>

    <div v-if="displayAddGame">
      <br>
      <h3>Lisa mäng sündmusele</h3>
      <br>

      <select v-model="selectedGameTypeId">
        <option v-for="gameType in gameTypes" :value="gameType.id">{{ gameType.name }}</option>
      </select> <input placeholder="Mängu nimi" v-model="gameName">
      <br>
      <br>
      <button v-on:click="addNewGame">Lisa uus mäng</button>
    </div>
    <br>
    <br>

    <div v-if="displayGamesTable">
      <h3>Võistluse mängud</h3>
      <table>
        <tr>
          <th>Tüüp</th>
          <th>Mängu nimi</th>
          <th></th>
        </tr>

        <tr v-for="game in allGames">
          <td>{{ game.gameTypeName }}</td>
          <td>{{ game.gameName }}</td>

            <button v-on:click="deleteGameInCompetition(game.gameInCompetitionId)">x</button>
        </tr>
      </table>
      <br>
    </div>

  </div>
</template>

<script>
export default {
  name: "Admin",
  data: function () {
    return {
      gameInCompetitionId: 0,
      competitionName: "",
      competitionId: 0,
      gameName: "",
      availableCompetitions: {},
      allGames: {},

      select: false,
      selected: [],
      selectAll: true,

      newGame: {
        competitionId: 0,
        gameName: "",
        gameTypeId: 0,
        gameTypeName: ""
      },

      options: {},
      gameTypes: [],
      selectedGameTypeId: 0,
      selectedGameId: 0,
      selectedCompetitionId: 0,
      displayAddNewCompetition: false,
      displayEditCompetitionName: false,
      displayAddGame: false,
      displayGamesTable: false,
      displayChooseAction: true,
      displayChooseGame: false,

      date: function () {
        return Date.now();
      }
    }
  },

  methods: {

    openAddNewCompetition: function () {
      this.displayAddNewCompetition = true
      this.displayChooseAction = false
    },

    openChooseCompetition: function () {
      this.displayChooseGame = true
      this.displayChooseAction = false

      this.$http.get("/competition/get/all")
          .then(response => {
            this.availableCompetitions = response.data
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },

    displayGamesInCompetition: function () {
      this.competitionId = this.selectedCompetitionId;
      sessionStorage.setItem('competitionId', this.competitionId)
      for (let index in this.availableCompetitions) {
        if (this.availableCompetitions[index].id == this.selectedCompetitionId)
         this.competitionName = this.availableCompetitions[index].name
      }
      this.findGamesInCompetition()
      this.hideAllDivs()
      this.displayAddGame = true
      this.displayAddGame = true
      this.displayEditCompetitionName = true
      this.displayGamesTable = true
    },

    deleteGameInCompetition: function (gameInCompetitionId) {
      this.$http.delete("/competition/delete/game", {
            params: {
              gameInCompetitionId: gameInCompetitionId
            }
          }
      ).then(response => {
        this.hideAllDivs()
        this.displayEditCompetitionName = true
        this.displayAddGame = true
        this.displayGamesTable = true
        alert("Mäng kustutatud")
        this.findGamesInCompetition()
      }).catch(error => {
        alert(error)
        console.log(error)
      })
    },

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
        this.gameName = ""
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
      this.displayChooseGame = false
    }
  },
  beforeMount() {
    this.getAllGameTypes()
  }
}
</script>

<style scoped>

</style>