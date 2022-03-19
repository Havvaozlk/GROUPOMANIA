<template>
  <div class="home">
    <img alt="Groupomania logo" src="../assets/icon-above-font.png" />
    <p class="NavP">
      Avec Groupomania, partagez et rester en contact avec vos collègues.
    </p>
    <form id="form" @submit.prevent="signup()">
      <input
        v-model="dataSignup.firstName"
        type="text"
        id="firstName"
        class="signupInput"
        placeholder="Prénom"
      />
      <input
        v-model="dataSignup.lastName"
        type="text"
        id="lastName"
        class="signupInput"
        placeholder="Nom"
      />
      <input
        v-model="dataSignup.email"
        type="email"
        id="mail"
        class="signupInput"
        placeholder="Adresse email"
      />
      <input
        v-model="dataSignup.password"
        type="password"
        id="passwordSignup"
        class="signupInput"
        placeholder="Mot de passe"
      />
      <p v-if="error" class="ErrorMessage">{{error}}</p>
      <button @click.prevent="signup" type="submit" class="buttonSignup">
        S'INSCRIRE
      </button>
      <router-link to="/" role="button" class="loginButton"
        >Vous avez déjà un compte ?</router-link
      >
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
          axios
          .post("http://localhost:8000/api/user/signup", {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("mail").value,
            password: document.getElementById("passwordSignup").value
          })
          .then(() => {
          this.$router.push("/");
          })
          .catch(() => {
          this.error = "L'adresse mail doit être unique et le mot de passe doit comporter minimum 8 caractères avec au moins un chiffre, une majuscule, une minuscule sans espaces."
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
width: 40%;
height: auto;
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


.buttonSignup {
  padding: 0.7rem 2rem;
    border-radius: 6px;
    color: white;
    background-color: #1b7f1b;
    border: 0px;
    text-decoration: none;
    cursor: pointer;
}

.infoPassword {
      color: #f02849;
    font-size: small;
}

#file {
    border: solid 1px black;
    color: black;
    padding: 0.5rem;
    width: 50%;
}

.signupInput {
width: 40%;
    margin-bottom: 1rem;
    padding-left: 1rem;
    height: 2rem;
    border-radius: 6px;
    border: 0.5px solid 
}

.loginButton {
  color: #146ec6;
    font-size: small;
    margin-bottom: 1rem;
}
</style>