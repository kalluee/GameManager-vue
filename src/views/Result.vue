<template>
  <div class="result">
    <h1>Tulemused</h1>

    <div>
      <button v-model="getAllPlayer">Kuva mängijaid</button>
      <button>Kuva meeskondi</button>
      <button>Kuva võistlusi</button>
      <button>Kuva meeskondi võistlustes</button>
    </div>
    <br>
    <div><br>
      <h5>Mängijate nimekiri</h5>
      <table>
        <tr>
          <th>Eesnimi</th>
          <th>Perekonnanimi</th>
          <th>Vanus</th>
        </tr>
        <tr v-for="player in allPlayers">
          <td><input v-model="player.firstName"></td>
          <td><input v-model="player.lastName"></td>
          <td><input v-model="player.age"></td>
        </tr>
      </table>
    </div>

  </div>
</template>
<Script>
export default {
  name: "Referee",
  data: function () {
    return {
      teamId: 0,
      allPlayers: {},
      player: {
        firstName: "",
        lastName: "",
        age: null
      },

      displayOption: true,
      displayTeamPlayer: false,
      displayPlayer: false
    }
  },
  methods: {

    getAllPlayer: function () {
      this.$http.get("/display/get/all/player")
          .then(response => {
            this.allPlayers = response.data
            this.hideAllDivs()
            this.displayOption = true
            this.displayPlayer = true
          }).catch(error => {
        console.log(error)
      })
    },


    // findPlayersInTeam: function () {
    //   this.$http.get("/team/player/all", {
    //         params: {
    //           teamId: this.teamId
    //         }
    //       }
    //   ).then(response => {
    //     this.hideAllDivs
    //     this.displayOption = true
    //     this.displayTeamPlayer = true
    //     this.allPlayers = response.data
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },


    hideAllDivs: function () {
      this.displayOption = false
      this.displayPlayer = false
      this.displayTeam = false
      this.displayTeamPlayer = false
      this.displayTeamInGame = false
      this.displayGame = false
    }

  }
}
//findAllPlayers
//findAllTeams
//findAllGames


</Script>