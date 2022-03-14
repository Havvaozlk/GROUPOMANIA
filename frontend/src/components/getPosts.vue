<template>
<div v-for="post in posts.slice().reverse()" :key="post.id" class="postList">
          <div class="blocauthor">
              <div class="user">
              <div class="img">
              <img src="../avatar1.png" class="avatar"/>
              </div>
              <div id="user">
              <h3 class="username">Nom prénom</h3>
              <p class="date"> Publié le {{ dateFormat(post.createdAt) }} </p>
              </div>
              </div>
          </div>
          <div class="contentPost">
              
              <p v-if="post.content !== 'null'" class="pcontentPost">  {{ post.content}} </p>
          <div v-if="post.imageUrl" class="contentPostImg">
          <img class="contentImg" :src="post.imageUrl" alt="image publiée"/>
          </div>
          </div>  
          <div v-if="post.userId == userId || admin == true" class="DeletePost">
                <button type="button" class="updateButton">MODIFIER </button>
                <button type="button" @click="deletePost(post.id)" class="deleteButton">SUPPRIMER </button>
          </div>
          <div class="getAllComments">
           <div v-for="comment in comments.filter((comment) => {
              return comment.postId == post.id;
            })" :key="comment.id" class="commentsList">
            
           <div class="userComment">
           <div class="divImage">
<img src="../avatar1.png" class="avatarComment"/>
           </div>
           <div class="divUserContentDate">
           <div class="divUserContent">
<h3 class="usernameComment">Nom prénom</h3>
          <p>{{comment.content}}</p>
           </div>
<p class="dateComment"> Publié le {{ dateFormat(comment.createdAt) }} </p>
           </div>
           <div v-if="comment.userId == userId || admin == true" class="deleteComment">
           <button @click="deleteComment(comment.id)" type="text" class="deleteComment">Supprimer X</button>
           </div>
           </div>
           </div>
          <div class="divComment">
          <textarea v-model="content" type="text" id="comment" placeholder="Ecrire un commentaire.."></textarea>
          <button @click="sendComment(post.id)" type="text" class='sendComment'>COMMENTER</button>
          <p v-if="error" id="msgError">
      {{ error }}
    </p>
          </div>
      </div> 
      </div>  
</template>

<script>
import moment from "moment"
import axios from "axios"
export default {
    name: "getPosts",

    data() {
        return {
            firstName: localStorage.getItem('firstName'),
            lastName: localStorage.getItem('lastName'),
            status: "",
            userId: "",
            admin: "",
            posts: [],
            content:"",
            comment:"",
            comments:[],
            error:""
        }
    },
    created() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        this.admin = JSON.parse(localStorage.getItem("admin"));
        console.log(localStorage);


        let url = "http://localhost:8000/api/post";
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
                this.posts = data;
                console.log(this.posts)

            })
            .catch(error => console.log(error))
    
                let urlComments = "http://localhost:8000/api/comment";
        let optionsComments = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(urlComments, optionsComments)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.comments = data;
                console.log(this.comments)

            })
            .catch(error => console.log(error))
    },
    
    methods: {
        dateFormat(date){
                if (date) {
                    return moment(String(date)).format('DD/MM/YYYY')
                }
            },
            deletePost (postId) {
                axios.delete('http://localhost:8000/api/post/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => console.log(error))

            },
            sendComment(id) {
                const postId = id;

                axios.post('http://localhost:8000/api/comment/' + postId, {
                    
                    content: this.content,
                },{
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload() 
                    console.log(this.content)                   
                })
                .catch(error => console.log(error))
                
            },     
            deleteComment(id) {
                  axios.delete('http://localhost:8000/api/comment/' + id, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => console.log(error))  
            }    
          
}
}
</script>

<style>
.postList {
    width: 90%;
    border: solid 1px transparent;
    margin: 0rem 0 1rem 0;
    background: white;
    border-radius: 1rem;
    box-shadow: 2px 2px 2px grey;
}

.user {
    display: flex;
}

.img {
    height: 38px;
    width: 38px;
    border-radius: 2rem;
    padding: 0.5rem;
}

.avatar {
    border-radius: 2rem;
}

.pcontentPost {
    padding: 0 2rem 1rem 2rem;
    margin: 0;
}

.contentPostImg {
    padding: 0 1rem 1rem 1rem;
}

.contentImg {
    width: 100%;
}

.date {
    font-size: smaller;
    margin-bottom: 0;
}

.username {
    margin: 0;
    height: 0.9rem;
}

.DeletePost {
        padding: 0.5rem 0 0.5rem 0;
    border-bottom: solid 0.5px lightgrey;
    margin-bottom: 1rem;
}

.deleteButton {
    border: none;
    background: transparent;
    color: inherit;
    font-size: inherit;
    cursor:pointer;
}

.updateButton {
    border: none;
    background: transparent;
    color: inherit;
    font-size: inherit;
    cursor: pointer;
}

 #user {
     padding: 0.5rem 0 0.5rem 0;
 }

.username {
    margin: 0;
    height: 0.9rem;
    font-size: unset;
    text-align: start;
}

.date {
    font-size: smaller;
    margin: 0.5rem 0 0 0;
}

.divComment {
    display:flex;
}

#comment {
    border-radius: 1rem;
    margin: 0 1rem 1rem 0.5rem;
    width: 70%;
    padding-left: 1rem;
}

.sendComment {
    height: 2rem;
    width: 25%;
    font-size: small;
    border: solid 1px inherit;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
}

.contentPost {
    border-bottom: solid lightgrey 1px;
}

.userComment {
    display:flex;
}

.avatarComment {
    width: 29px;
}

.divUserContent {
    padding: 0.5rem 1rem 1rem 1rem;
    border-radius: 0.5rem;
    background: #f0f2f5;
}

.usernameComment {
    margin: 2px 0 4px 0;
    font-size: unset;
}

.divUserContent p {
    margin: 0 0 0 -5px;
}

.divImage {
    margin-right: 1rem;
}

.dateComment {
    margin: 0.2rem 0 1rem 0;
    text-align: start;
    color: grey;
    font-size: smaller;
}

.getAllComments {
    margin-top: 1rem;
}

.deleteComment {
        border: none;
    background: transparent;
    color: grey;
    cursor: pointer;
}

</style>