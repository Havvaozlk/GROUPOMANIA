<template>
<div class='home'>
<img alt='Groupomania logo' src="../assets/icon-above-font.png" />
<p class="NavP"> Avec Groupomania, partagez et rester en contact avec vos collègues. </p>
<form id="form" @submit.prevent="signup()">
<input  v-model="dataSignup.firstName" type='text' id='firstName' placeholder='Prénom'/>
<input v-model="dataSignup.lastName" type='text' id='lastName' placeholder='Nom'/>
<input v-model="dataSignup.email" type='email' id='mail' placeholder='Adresse email'/>
<input v-model="dataSignup.password" type='password' id='passwordSignup' placeholder='Mot de passe'/>
<p v-if="error" class="ErrorMessage"> {{error}}</p>
<button @click.prevent="signup" type='submit'>S'INSCRIRE</button>
<p class="infoPassword"> L'adresse mail doit être unique et le mot de passe doit comporter minimum 8 caractères avec au moins un chiffre, une majuscule, une minuscule sans espaces.</p>
<!--<router-link to="/login" role="button">Vous avez déjà un compte ?<router-link>-->
<router-link to="/login" role='button' class='loginButton'>Vous avez déjà un compte ?</router-link>
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
          password:"",
          } ,
          error:"",
          
      };
  },
  methods: {
      signup() {
        if (
          this.firstName != "" && this.lastName != "" && this.email != "" && this.password != "") {

          axios
          .post("http://localhost:8000/api/user/signup", this.dataSignup)
          .then((res) => {
        localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("admin", res.data.admin);

          this.$router.push("/post");
          })
          .catch(() => {
          (this.error = "Veuillez remplir tout les champs de saisie.")
          })     
          } else {
            (this.error = "Error")
          }
  }}
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
    cursor: pointer;
}

.infoPassword {
      color: #f02849;
    font-size: small;
}
</style>