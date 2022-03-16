<template>
<NavU/>
<div id="bloc">
  <div id="backgroundImg">
    <div id="divImgAvatar">
      <img src="../avatar.png" alt="avatar utilisateur" />
    </div>
  </div>
  <h1>MES INFORMATIONS </h1>
  <div id="informations">
    <div class="typeInfo">
      <p>NOM</p>
      <P>PRENOM</p>
      <p>EMAIL</p>
    </div>
    <div id="infoUser">
      <p class="myLastName infoUser"> {{ lastName }}</p>
      <p class="myFirstName infoUser"> {{ firstName }}</p>
      <p class="myEmail infoUser"> {{email}}</p>
    </div>
  <!--<button class="buttonModal">MODIFIER</button>-->
    <div id="divModal" > 
  <modalProfile :revele="revele" :toggleModale="toggleModale"></modalProfile>
        <div v-on:click="toggleModale" class="btn btn-success">MODIFIER</div>
      </div>
    </div>
    <div class="deleteAccount">
      <button @click="deleteAccount" class="deleteAccountButton">SUPPRIMER MON COMPTE</button>
      
    </div>
</div>
</template>

<script>
import NavU from '../components/NavU';
import modalProfile from '../components/modalProfile'
import axios from "axios"
export default {

  name: "ProfileView",
  components: {
    NavU,
    modalProfile
  },

    data() {
        return {
            firstName: localStorage.getItem('firstName'),
            lastName: localStorage.getItem('lastName'),
            status: "",
            userId: "",
            email: localStorage.getItem('email'),
            error:"",
            revele: false,
            post:{}
        }
    },

  created() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
        this.admin = JSON.parse(localStorage.getItem("admin"));       
        console.log(localStorage);

         let url = "http://localhost:8000/api/user/" + this.userId;
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.users = data;
                console.log(this.users)

            })
            .catch(error => console.log(error))
  },

  methods: {
    toggleModale: function() {
      this.revele = !this.revele;
    },

    async deleteAccount() {
      const userId = localStorage.getItem('userId');
      let confirmDeletePost = confirm(
        "voulez-vous vraiment supprimer votre compte ?"
      );
      if (confirmDeletePost == true) {
                await axios.delete('http://localhost:8000/api/user/' + userId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    localStorage.clear();
                    this.$router.push('/login');
                })
                .catch(error => console.log(error)) 
      } else {
        return;
      }
    }
  }
}
</script>

<style>
#bloc {
  display: flex;
    flex-direction: column;
    align-items: center;
}

#backgroundImg {
      width: 90%;
    background: lightgrey;
    border-radius: 3rem;
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: end;
}

#divImgAvatar {
  width: 15%;
    background: #f0f2f5;
    border-radius: 6rem;
    padding: 1rem;
    margin-bottom: 2rem;
}

#divImgAvatar img {
  width: 100%
}

.userInfo {
  width: 90%
}

#informations {
  display: flex;
  width:90%;
}

.typeInfo {
      width: 30%;
    text-align: end;
    font-weight: bold;
}

#infoUser {
  width:30%
}

#divModal {
  display: flex;
  align-items: center;
}
.btn-success {
      border: 1px solid grey;
    padding: 0.5rem;
    border-radius: 1rem;
    background: lightgrey;
    cursor: pointer;
    font-weight: bold;
}

.deleteAccountButton {
  padding: 0.3rem;
  font-weight: bold;
  background: grey;
  cursor:pointer;
}

@media screen and (max-width:700px) {
  #logo {
    width: 100%;
  }

}
</style>