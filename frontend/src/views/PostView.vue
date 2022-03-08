<template>
<NavU/>
<div class="container">
<div class="Posts">
<h1>BIENVENUE SUR VOTRE ESPACE </h1>
<div class="createPost">
<textarea id='textarea' placeholder='Exprimez-vous'></textarea>
<input @change="newFile( $event )" type='file' id="file" name='image'>
<button @click="newPost" type="text" class='partager'>PARTAGER</button>
<p v-if="error" id="msgError">
      {{ error }}
    </p>
</div>
</div>
</div>

</template>
<script>
import NavU from '../components/NavU';
import axios from "axios";


export default {
  name: "PostView",
  components: {
    NavU,
  },
  data() {
    return {
       userId: localStorage.getItem("userId"),
       token: localStorage.getItem('token'),
       image: "",
       content: "",
       error:"",
    };
  },
  methods: {
    newFile( event ) {
    this.image = event.target.files[0];
  },
       async newPost() {
          const formData = new FormData();
          formData.append("userId", parseInt(localStorage.getItem('userId')));
          formData.append('content', document.getElementById('textarea').value);
          formData.append('image', this.image);
          if (formData.get("content") == "") {
        this.error = "Message vide";
      } else {
        await axios
        .post("http://localhost:8000/api/post", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            window.location.reload()
          })
          .catch((error) => (this.msgError = error));
      }
  },
  
}
}
</script>
<style>
.container {
      width: 100%;
    display: flex;
    justify-content: center;
}

.Posts {
  width: 90%;
    border: solid 2px rgb(253, 45, 1);
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: rgb(253, 45, 1);
    align-items: center;
}

.createPost {
  width: 90%;
    border: solid 1px;
    margin: 1rem 0 2rem 0;
}

#textarea {
    width: 90%;
    height: 4rem;
    margin-top: 1rem;
}

.partager {
    padding: 0.7rem 2rem;
    border-radius: 6px;
    color: white;
    background-color: rgb(253, 45, 1);
    border: 0px;
    text-decoration: none;
    cursor: pointer;
    margin: 1rem;
}
</style>