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
      <button v-on:click="addGame">Loo uus mäng</button>


    </div>


    <div v-if="displayGamesTable">
      <br>
      <br>
      <table>
        <tr>
          <th>Eesnimi</th>
          <th>Perekonnanimi</th>
          <th>Vanus</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for="row in allPlayers">
          <td><input v-model="row.firstName"></td>
          <td><input v-model="row.lastName"></td>
          <td><input v-model="row.age"></td>
          <td>
            <button v-on:click="">Muuda</button>
          </td>
          <td>
            <button v-on:click="removeRow">x</button>
          </td>
        </tr>

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
      newGame: {
        competitionId: 0,
        game: {
          gameTypeId: 0,
          gameId: 0,
          name: "",
        },
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
        this.competitionId = response.data.competitionId
        sessionStorage.setItem('competitionId', this.competitionId)

        console.log(response.data)

      }).catch(error => {
        alert(error)
        console.log(error)
      })
    },

    addGame: function () {
      this.$http.post("/game/add/game", null, {
            params: {
              gameTypeId: this.selectedGameTypeId,
              gameName: this.gameName
            }
          }
      ).then(response => {
        alert("success")
      }).catch(error => {
        alert(error)
        alert("success")
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