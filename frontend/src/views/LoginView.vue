<template>
<div class='home'>
<img alt='Groupomania logo' src="../assets/icon-above-font.png" />
<p class="NavP"> Avec Groupomania, partagez et rester en contact avec vos collègues. </p>
<form id="form" @submit.prevent="login()" method='post'>
<input v-model="dataLogin.email" type='email' id='email' placeholder='Adresse email'>
<input v-model="dataLogin.password" type='password' id='password' placeholder='Mot de passe'>
<p v-if="error" class="ErrorMessage"> {{error}}</p>
<input @click.prevent="login" type='submit' value='SE CONNECTER'>
<a href='#' id="forgetPassword">Mot de passe oublié ? </a>
<div class='signup'>
<router-link to="/signup" role='button' class='signupButton'>CREER UN COMPTE</router-link>
</div>
</form>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "loginView",

  data() {
      return {
          dataLogin: {
          email: "",
          password: "",
          },
           error: "", 
      };
  },
  methods: {
      login() {
          axios
          .post("http://localhost:8000/api/user/login", this.dataLogin)
          .then((res) => {
        localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("admin", res.data.admin);
          localStorage.setItem('firstName', res.data.firstName);
          localStorage.setItem('lastName', res.data.lastName);
          localStorage.setItem('email', res.data.email);

          this.$router.push("/post");
          })
          .catch(() => {
          (this.error = "L'adresse ou le mot de passe que vous avez saisie est incorrecte")
          })     
          }
  }

};
</script>
<style>
.home {
align-items: center
}

.home img {
width: 40%
}
.NavP {
margin-top: 0;
    font-size: 1.5rem;
    font-family: inherit;
}

#form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 2rem 0 2rem 0;
    border: solid 0.5px;
    box-shadow: 1px 1px 1px grey;
    }

input#email  {
    width: 40%;
    margin-bottom: 1rem;
    padding-left: 1rem;
    height: 2rem;
    border-radius: 6px;
    border: 0.5px solid 
}

input#password  {
    width: 40%;
    margin-bottom: 1rem;
    padding-left: 1rem;
    height: 2rem;
    border-radius: 6px;
    border: 0.5px solid;
}

input[type="submit"] {
width: 40%;
    margin-bottom: 1rem;
        background: rgb(253, 45, 1);
    color: white;
    border: 0;
    border-radius: 6px;
    height: 2rem;
    cursor: pointer
}

#forgetPassword {
    color: dodgerblue;
    font-size: small;
    margin-bottom: 1rem;
}

.signup {
    width: 100%;
    border-top: solid 0.5px;
    padding-top: 2rem;
    }

.signupButton {
padding: 0.7rem 2rem;
    border-radius: 6px;
    color: white;
    background-color: forestgreen;
    border: 0px;
    text-decoration: none;
    }

.ErrorMessage {

 color: #f02849;
    font-size: small;
}

</style>
