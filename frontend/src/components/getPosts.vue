<template>
  <div style="display: flex; flex-direction: column; align-items: center; width:90%">
    <div v-for="post in posts" :key="post.id" class="postList">
      <div class="blocauthor">
        <div class="user">
          <div class="img">
            <img src="../avatar1.png" class="avatar" alt="avatar" />
          </div>
          <div id="user">
            <h3 class="username">
              {{post.user.firstName}} {{post.user.lastName}}
            </h3>
            <p class="date">Publié le {{ dateFormat(post.createdAt) }}</p>
          </div>
        </div>
      </div>
      <div class="contentPost">
        <p v-if="post.content !== 'null'" class="pcontentPost">
          {{ post.content}}
        </p>
        <div v-if="post.imageUrl" class="contentPostImg">
          <img class="contentImg" :src="post.imageUrl" alt="image publiée" />
        </div>
      </div>
      <div v-if="post.userId == userId || admin == true" class="DeletePost">
        <button type="button" @click="deletePost(post.id)" class="deleteButton">
          SUPPRIMER
        </button>
      </div>
      <div class="getAllComments">
        <div
          v-for="comment in comments.filter((comment) => {
              return comment.postId == post.id;
            })"
          :key="comment.id"
          class="commentsList"
        >
          <div class="userComment">
            <div class="divImage">
              <img
                src="../avatar1.png"
                class="avatarComment"
                alt="avatar utilisateur"
              />
            </div>
            <div id="responsiveComment" style="display:flex">
            <div class="divUserContentDate">
              <div class="divUserContent">
                <h3 class="usernameComment">
                  {{comment.creatorFirstName}} {{comment.creatorLastName}}
                </h3>
                <p>{{comment.content}}</p>
              </div>
              <p class="dateComment">
                Publié le {{ dateFormat(comment.createdAt) }}
              </p>
            </div>
            <div
              v-if="comment.userId == userId || admin == true"
              class="deleteComment"
            >
              <button
                @click="deleteComment(comment.id)"
                type="text"
                class="deleteComment"
              >
                Supprimer X
              </button>
              </div>
            </div>
          </div>
        </div>
        <div class="divComment">
          <textarea
            v-model="content"
            type="text"
            class="comment"
            placeholder="Ecrire un commentaire.."
          ></textarea>
          <button @click="sendComment(post.id)" type="text" class="sendComment">
            COMMENTER
          </button>
          <p v-if="error" id="msgError">
            {{ error }}
          </p>
        </div>
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
            firstName: "",
            lastName: localStorage.getItem('lastName'),
            status: "",
            userId: "",
            admin: "",
            posts: [],
            content:"",
            comments:[],
            comment: "",
            error:""
        }
    },
    created() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        this.admin = JSON.parse(localStorage.getItem("admin"));
        console.log(localStorage);


        let url = "http://localhost:8000/api/post";
        let options = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        axios.get(url, options)
            .then(data => {
                console.log(data)
                this.posts = data.data;
            })
            .catch(error => console.log(error))

                let urlComments = "http://localhost:8000/api/comment";
        let optionsComments = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        axios.get(urlComments, optionsComments)
            .then(data => {
                this.comments = data.data;

            })
            .catch(error => console.log(error))
    },

    methods: {
        pushCurrent(id) {
            let data = {
                postId: id,
                content: "",
            }
            this.current.push(data)
        },

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
                .then(() => {
                   window.location.reload()
                })

            },
            sendComment(id) {
                const postId = id;

                axios.post('http://localhost:8000/api/comment/' + postId, {

                    content: this.content,
                    creatorFirstName: localStorage.getItem("firstName"),
                    creatorLastName: localStorage.getItem("lastName"),
                },{
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload()
                    console.log("content" + this.content)
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
.disabled {
    color: white;
}
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
    width: 100%;
    height: 100%;
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
    height: 100%;
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
    border-bottom: solid 0.5px lightgrey;
    margin-bottom: 1rem;
}

.deleteButton {
    border: none;
    background: transparent;
    color: inherit;
    font-size: inherit;
    cursor:pointer;
    height:48px;
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
    height: auto;
}

.date {
    font-size: smaller;
    margin: 0.5rem 0 0 0;
}

.divComment {
    display:flex;
}

.comment {
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
    height: auto;
}

.divUserContent {
    padding: 0.5rem 1rem 1rem 1rem;
    border-radius: 0.5rem;
    background: #f0f2f5;
    max-width: 90%;
}

.usernameComment {
    margin: 2px 0 4px 0;
    font-size: unset;
    text-align: start;
}

.divUserContent p {
    margin: 0 0 0 -5px;
    word-break: break-all;
    width: 100%;
}

.divImage {
    margin-right: 1rem;
}

.dateComment {
    margin: 0.2rem 0 1rem 0;
    text-align: start;
    color: #777575;
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

@media screen and (max-width:700px) {
    .divComment {
    flex-direction: column;
    align-items: center;
  }

  .sendComment {
      width: 50%;
  }

  #responsiveComment {
    flex-direction: column;
    align-items: baseline;
  }

  .dateComment {
    margin-bottom: 0;
  }

  .deleteComment {
    margin-bottom: 1rem;
  }


}
</style>