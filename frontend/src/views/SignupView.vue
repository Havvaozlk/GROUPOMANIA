<template>
<div class='home'>
<img alt='Groupomania logo' src="../assets/icon-above-font.png" />
<p> Avec Groupomania, partagez et rester en contact avec vos collègues. </p>
<form id="form" @submit.prevent="signup()">
<input  v-model="dataSignup.firstName" type='text' id='firstName' placeholder='Prénom'/>
<input v-model="dataSignup.lastName" type='text' id='lastName' placeholder='Nom'/>
<input v-model="dataSignup.email" type='email' id='mail' placeholder='Adresse email'/>
<input v-model="dataSignup.password" type='password' id='passwordSignup' placeholder='Mot de passe'/>
<button @click.prevent="signu" type='submit'>S'INSCRIRE</button>
</form>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignupView",

   data() {
      return {
          dataSignup: {
          firstName: "",
          lastName: "",
          email:"",
          password:""
          } 
      };
  },
  methods: {
      signup() {
          axios
          .post("http://localhost:8000/api/user/signup", this.dataSignup)
          .then((res) => {
        localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("admin", res.data.admin);

          this.$router.push("/post");
          })
          .catch(() => {
          (this.error = "email ou mot de passe incorrecte")
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
.home p {
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

input  {
    width: 40%;
    margin-bottom: 1rem;
    padding-left: 1rem;
    height: 2rem;
    border-radius: 6px;
    border: 0.5px solid 
}

button {
  padding: 0.7rem 2rem;
    border-radius: 6px;
    color: white;
    background-color: forestgreen;
    border: 0px;
    text-decoration: none;
}
</style>