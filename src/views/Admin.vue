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

      <select v-model="selectedGameTypeId">
        <option v-for="gameType in gameTypes" :value="gameType.id">{{ gameType.name }}</option>
      </select>
      <input placeholder="Mängu nimi" v-model="gameName">
      <br><br>
      <button v-on:click="addNewGame">Loo uus mäng</button>
      <button></button>
    </div>

    <div v-if="displayGamesTable">
      <table>
        <tr>
          <th>Mängu nimi</th>
        </tr>

        <tr v-for="row in allGames">
          <!--          <td><input v-model="row.newGame.game.gameTypeId"></td>-->
          <td><input v-model="row.gameName"></td>
        </tr>
        <br>
      </table>
      <button>Salvesta</button>

    </div>


    <!--    <div v-if="displayGamesTable"><br><br>-->
    <!--      <table>-->
    <!--        <tr>-->
    <!--          <th>Mängu nimi</th>-->
    <!--          <th></th>-->
    <!--          <th></th>-->
    <!--        </tr>-->

    <!--        <tr v-for="row in allGames">-->

    <!--          <td><input v-model="row.gameName"></td>-->
    <!--          <td>-->
    <!--            <button v-on:click="">Muuda</button>-->
    <!--          </td>-->
    <!--          <td>-->
    <!--            <button v-on:click="removeRow">x</button>-->
    <!--          </td>-->
    <!--        </tr>-->

    <!--      </table>-->
    <!--      <br>-->
    <!--      <button>Salvesta</button>-->
    <!--    </div>-->

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
      tableGameName: "",

      newGame: {
        competitionId: 0,
        gameTypeId: 0,
        gameName: "",

      },
      options: {},
      gameTypes: [],
      selectedGameTypeId: 10,
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
      this.newGame.competitionId = sessionStorage.getItem('competitionId')
      this.newGame.gameTypeId = this.selectedGameTypeId
      this.newGame.gameName = this.gameName
      this.$http.post("/game/add/game", this.newGame
      ).then(response => {
        this.displayGamesTable = true
        this.findGamesInCompetition()
        alert("success")
      }).catch(error => {
        alert(error)
        alert("success")
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