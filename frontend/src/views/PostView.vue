<template>
<NavU/>
<div class="container">
<div class="Posts">
<div class="createPost">
<textarea id='textarea' placeholder='Exprimez-vous'></textarea>
<input @change="newFile( $event )" type='file' id="file" name='image'>
<button @click="newPost" type="text" class='partager'>PARTAGER</button>
<p v-if="error" id="msgError">
      {{ error }}
    </p>
</div>
<getPosts/>
</div>
</div>

</template>
<script>
import NavU from '../components/NavU';
import axios from "axios";
import getPosts from '../components/getPosts';

export default {
  name: "PostView",
  components: {
    NavU,
    getPosts,
  },
  data() {
    return {
       userId: localStorage.getItem("userId"),
       token: localStorage.getItem('token'),
       firstName: localStorage.getItem('firstName'),
       lastName: localStorage.getItem('lastName'),
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
  width: 60%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.createPost {
  width: 90%;
    border: solid 1px transparent;
    margin: 1rem 0 2rem 0;
    background: white;
    border-radius: 1rem;
    box-shadow: 2px 2px 2px grey;
}

#textarea {
    width: 90%;
    height: 2rem;
    margin-top: 1rem;
    background: transparent;
    border-radius: 2rem;
    padding-left: 1rem;
    background: #f0f2f5;
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