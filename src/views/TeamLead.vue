<template>
  <div>

    <div v-if="displayAddNewTeam">
      <input placeholder="Uue meeskonna nimi" v-model="teamName">
      <button v-on:click="addNewTeam">Lisa uus meeskond</button>
    </div>

    <div v-if="displayEditTeamName">
      <input v-model="teamName">
      <button>Uuenda</button>
    </div>


    <div v-if="displayPlayersTable">
      <br>
      <br>
      <table>
        <tr>
          <th>eesnimi</th>
          <th>perekonnanimi</th>
          <th>vanus</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for="row in allPlayers">
          <td><input v-model="row.firstName"></td>
          <td><input v-model="row.lastName"></td>
          <td><input v-model="row.age"></td>
          <td>
            <button>muuda</button></td>
          <td>
            <button>x</button></td>
        </tr>
      </table>
    </div>


    <div v-if="displayAddPlayer">
      <br>
      <br>
      <h5>Lisa mängija</h5>
      <input placeholder="eesnimi" v-model="newPlayer.player.firstName">
      <input placeholder="perekonnanimi" v-model="newPlayer.player.lastName">
      <input placeholder="vanus" v-model="newPlayer.player.age">
      <button v-on:click="addNewPlayer">Lisa mängija</button>
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
      displayPlayersTable: false
    }
  },
  methods: {
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
    addNewPlayer: function () {
      this.newPlayer.teamId = sessionStorage.getItem('teamId')
      this.$http.post("/team/player", this.newPlayer
      ).then(response => {
        this.newPlayer.player.firstName = null
        this.newPlayer.player.lastName = null
        this.newPlayer.player.age = null
        this.findTeamPlayers()
        this.displayPlayersTable = true
      }).catch(error => {
        alert("Error")
        console.log(error)
      })
    },
    findTeamPlayers: function () {
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
    }
    ,
    hideAllDivs: function () {
      this.displayAddNewTeam = false
      this.displayEditTeamName = false
      this.displayAddPlayer = false
      this.displayPlayersTable = false
    }
  }
}
</script>

<style scoped>

</style>