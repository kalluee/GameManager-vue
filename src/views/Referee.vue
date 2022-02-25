<template>
  <div>

    <div v-if="displayCompetitions">
      <br>
      <h5>Vali võistlus</h5>
      <br>
      <select v-model="selectedCompetitionId">
        <option disabled value = "0">Võistlus</option>
        <option v-for="competition in allCompetitions" :value="competition.id">{{competition.name}}</option>
      </select>
      <br>
      <button>Kinnita</button>
    </div>

    <div v-if="displayGames">
      <br>
      <h5>Vali mäng</h5>
      <br>


      <br>
      <button>Salvesta</button>

    </div>


    <div v-if="dis">
      <br>
      <br>
      <table>
        <tr>
          <th>Mängu tüüp</th>
          <th>Mängu nimi</th>
          <th>Rühmade arv</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for="row in allGames">
          <td><input v-model="row.firstName"></td>
          <td><input v-model="row.lastName"></td>
          <td><input v-model="row.age"></td>
          <td>
            <button>Muuda</button></td>
        </tr>

      </table>
      <br>
      <button>Salvesta</button>

    </div>

  </div>
</template>

<script>
export default {
  name: "Referee",
  data: function () {
    return {
      competitonName:"",
      competitonId: 0,
      gameName: "",
      newGame:{
        competitionId: 0,
        game: {
          gameName:""
        }
      },
      options:{},
      selectedCompetitionId: 0,
      allCompetitions:{},
      displayCompetitions: true,
      displayGames:false

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