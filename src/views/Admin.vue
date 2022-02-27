<template>
  <div>

    <div v-if="displayAddNewCompetition">
      <input placeholder="Uue sündmuse nimi" v-model="competitionName">
      <button v-on:click="addNewCompetition">Lisa uus sündmus</button>
    </div>


    <div v-if="displayEditCompetitionName">
      <input v-model="competitionName">
      <button>Muuda</button>
    </div>

    <div v-if="displayAddGame">
      <br>
      <h3>Lisa mäng</h3>
      <br>

      <select v-model="selectedGameTypeId">
        <option v-for="gameType in gameTypes" :value="gameType.id">{{ gameType.name }}</option>
      </select>

      <input placeholder="Mängu nimi" v-model="gameName">
      <br>
      <br>
      <button v-on:click="addNewGame">Loo uus mäng</button>
    </div>
    <br>
    <br>

    <div v-if="displayGamesTable">
      <h3>Võistluse mängud</h3>
      <table>
        <tr>
          <th>Vali</th>
          <th>Tüüp</th>
          <th>Mängu nimi</th>
          <th></th>
          <th></th>
        </tr>

        <tr v-for="game in allGames">
          <td><input type="checkbox" v-model="selectAll" @click="selected"></td>
          <td><input v-model="game.gameTypeName"></td>
          <td><input v-model="game.gameName"></td>

          <td><button>Muuda</button></td>
          <td><button v-on:click="deleteGameInCompetition(game.gameInCompetitionId)">x</button></td>
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


    // //------------------------------------------------------
    //
    // select() {
    //   this.selected = [];
    //   if (this.selectAll) {
    //     for (let i in this.items) {
    //       this.selected.push(this.items[i].id);
    //     }
    //   }
    // },
    // //-----------------------------------------------

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