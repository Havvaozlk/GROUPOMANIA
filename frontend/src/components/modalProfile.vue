<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="toggleModale"></div>

    <div class="modale card">
      <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
      <h2>MODIFIER VOTRE PROFIL</h2>
      <div class="update">
        <label for="lastName1" class="labelLastName">Nom *</label>
        <input v-model="lastName" id="lastName1" class="input" required />
      </div>
      <div class="update">
        <label for="firstName1" class="labelFirstName">Prénom *</label>
        <input v-model="firstName" id="firstName1" class="input" required />
      </div>
      <div class="update">
        <label for="email1" class="labelEmail">Email *</label>
        <input v-model="email" id="email1" class="input" required />
      </div>
      <button class="saveButton" @click="updateProfil">ENREGISTRER</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "modaleProfile",
  props: ["revele", "toggleModale"],

  data() {
        return {
            PfirstName: localStorage.getItem('firstName'),
            PlastName: localStorage.getItem('lastName'),
            Pemail: localStorage.getItem('email'),
            firstName: "",
            lastName: "",
            email: "",
            userId: localStorage.getItem('userId'),

        }
  },
  methods: {
    updateProfil() {
        const userId= this.userId;
        const content= {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        }

                axios.put(`http://localhost:8000/api/user/update/${userId}` , content, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                })
                .then((response) => {
                    localStorage.setItem("firstName", response.data.users.firstName);
                    localStorage.setItem("lastName", response.data.users.lastName);
                    localStorage.setItem("email", response.data.users.email);
                    this.$router.push("/post")
                })
                .catch(error => console.log(error))
    }
  }
}
</script>

<style>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  position: fixed;
  top: 30%;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}

.update {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

label {
        text-align: start;
    color: darkslategrey;
}

.input {
        border: none;
    border-bottom: 1px solid darkslategrey;
    background: transparent;
}

.saveButton {
    background:rgb(253, 45, 1);
    border-radius: 1rem;
    padding: 0.5rem;
    color:white;
    font-weight: bold;
}
</style>