<template>
  <div>

    <div v-if="displayAddNewTeam">
      <input placeholder="Rühma nimi" v-model="teamName">
      <button v-on:click="addNewTeam">Lisa rühm</button>
    </div>

    <div v-if="displayEditTeamName">
      <input v-model="teamName">
      <button>Muuda</button>
    </div>

    <div v-if="displayAddPlayer"><br><br>
      <h5>Lisa malevlane</h5>

      <input placeholder="Eesnimi" v-model="newPlayer.player.firstName">
      <input placeholder="Perekonnanimi" v-model="newPlayer.player.lastName">
      <input placeholder="vanus" v-model="newPlayer.player.age">
      <button v-on:click="addPlayerInTeam">Salvesta</button>
    </div>



    <div v-if="displayPlayersTable"><br><br>
      <h5>Rühma nimekiri</h5>
      <table>
        <tr>
          <th>Eesnimi</th>
          <th>Perekonnanimi</th>
          <th>Vanus</th>
          <th></th>
          <th></th>
        </tr>

        <tr v-for="player in allPlayers">
          <td><input v-model="player.firstName"></td>
          <td><input v-model="player.lastName"></td>
          <td><input v-model="player.age"></td>
          <td><button v-on:click="updatePlayerInfo(player)">Muuda</button></td>
          <td><button>x</button></td>
        </tr>
      </table>
      <br>
      <button>Salvesta</button>

    </div>


  </div>
</template>

<script>
export default {
  name: "TeamLead",
  data: function () {
    return {
      teamName: "",
      teamId: 0,
      newPlayer: {
        teamId: 0,
        player: {
          firstName: "",
          lastName: "",
          age: null
        }
      },
      allPlayers: {},
      firstName: this.$route.query.firstName,
      lastName: this.$route.query.lastName,

      displayAddNewTeam: true,
      displayEditTeamName: false,
      displayAddPlayer: false,
      displayPlayersTable: false,
      displayAllPlayersTable: false
    }
  },
  methods: {
    updatePlayerInfo: function (player) {
      this.$http.put("/player/update", player, {
            params: {
              teamPlayerId: player.teamPlayerId
            }
          }
      ).then(response => {
        this.hideAllDivs()
        this.displayEditTeamName = true
        this.displayAddPlayer = true
        this.displayPlayersTable = true
        this.teamId = response.data.teamId
        sessionStorage.setItem('teamId', this.teamId)
        alert("Mängija info muudetud!")
      }).catch(error => {
        alert(error)
        console.log(error)
      })
    },

    addNewTeam: function () {
      this.$http.post("/team/new", null, {
            params: {
              teamName: this.teamName
            }
          }
      ).then(response => {
        this.hideAllDivs()
        this.displayEditTeamName = true
        this.displayAddPlayer = true
        this.teamId = response.data.teamId
        sessionStorage.setItem('teamId', this.teamId)
      }).catch(error => {
        alert(error)
        console.log(error)
      })
    },

    addPlayerInTeam: function () {
      this.newPlayer.teamId = sessionStorage.getItem('teamId')
      this.$http.post("/team/player", this.newPlayer
      ).then(response => {
        this.newPlayer.player.firstName = null
        this.newPlayer.player.lastName = null
        this.newPlayer.player.age = null
        this.findPlayersInTeam()
        this.displayPlayersTable = true
      }).catch(error => {
        alert("Error")
        console.log(error)
      })
    },


    findPlayersInTeam: function () {
      this.$http.get("/team/player/all", {
            params: {
              teamId: this.teamId
            }
          }
      ).then(response => {
        this.allPlayers = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    hideAllDivs: function () {
      this.displayAddNewTeam = false
      this.displayEditTeamName = false
      this.displayAddPlayer = false
      this.displayPlayersTable = false
      this.displayAllPlayersTable = false
    }
  }
}
</script>

<style scoped>

</style>