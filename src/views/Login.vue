<template>
  <div>
    <input placeholder="Kasutajanimi" v-model="userName"><br>
    <input placeholder="Parool" v-model="password"><br>

    <div v-if="displayLoginButton">
      <button v-on:click="login">Logi sisse</button>
    </div>

    <div v-if="rolesSize > 1">
      <select v-model="selectedRole">
        <option v-for="option in options" :value="option.roleId">{{ option.roleName }}</option>
      </select>
      <br>
      <br>
      <button v-on:click="moveToRelevantPage(selectedRole)">Logi sisse rolliga</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      options: {},
      selectedRole: 0,
      rolesSize: 0,
      roleId: 0,
      displayLoginButton: true
    }
  },
  methods: {
    moveToRelevantPage: function (selectedRole) {
      switch (selectedRole) {

        case 1:
          alert("Mine admin lehele")
          this.$router.push({
            name: 'Admin', query: {
              firstName: this.firstName,
              lastName: this.lastName
            }
          });
          break;

        case 2:
          alert("Mine kohtuniku lehele")
          this.$router.push({
            name: 'Referee', query: {
              firstName: this.firstName,
              lastName: this.lastName
            }
          });
          break;

        case 3:
          alert("Mine rühmajuhi lehele")
          this.$router.push({
            name: 'TeamLead', query: {
              firstName: this.firstName,
              lastName: this.lastName
            }
          });
          break;
      }
    },

    login: function () {

      this.$http.get("/login/user", {
            params: {
              userName: this.userName,
              password: this.password
            }
          }
      ).then(response => {
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
        this.rolesSize = response.data.roles.length

        this.selectedRole = response.data.roles[0].roleId

        alert("Tere tulemast " + response.data.firstName + " " + response.data.lastName)
        console.log(response.data)


        sessionStorage.setItem('userId', response.data.userId)

        if (this.rolesSize > 1) {
          this.displayLoginButton = false;
          this.options = response.data.roles
        } else {

          this.roleId = response.data.roles[0].roleId;
          this.moveToRelevantPage(this.roleId);
        }

      }).catch(error => {
        alert(error.response.data.message + " Error Code " + error.response.data)
        console.log(error)
      })
    },
    saveDataToLocalStorage: function () {
      localStorage.setItem('roleSelected', this.selectedRole)
      localStorage.setItem('roleOptions', JSON.stringify(this.options))
    }
  }
}

</script>

<style scoped>

</style>