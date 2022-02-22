<template>
  <div>
    <input placeholder="Kasutajanimi" v-model="userName">
    <br>
    <input placeholder="Parool" v-model="password">
    <br>
    <button v-on:click="login">Logi sisse</button>


  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      userName: "",
      password: ""
    }
  },
  methods: {
    login: function () {

      this.$http.get("/login/user", {
            params: {
              userName: this.userName,
              password: this.password
            }
          }
      ).then(response => {
        alert("Tere tulemast "+ response.data.firstName + " " + response.data.lastName)
        console.log(response.data)
      }).catch(error => {
        alert(error.response.data.message + " Error Code " + error.response.data)
        console.log(error)
      })
    }
  }
}

</script>

<style scoped>

</style>