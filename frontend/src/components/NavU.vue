 <template>
 
 <header>
   <div class="divLogo">
      <img src="../assets/icon-left-font.png"  alt="le logo de gropomania" title="logo groupomania" id="logo" />
   </div>
   <div class="divNav">
      <router-link to="/post" role="button" class="accueilButton">ACCUEIL</router-link>
      <router-link to="/profile" role='button' class='profileButton'>MON PROFILE</router-link>
      <button @click="Logout" type='button' class='LogoutButton'>DECONNEXION</button>
    </div>
 </header>
</template>


<script>
export default {
  name: 'NavU',

  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
  }

  
</script>

<style>
header{
  display: flex;
  align-items: center;
  height: 6rem;
 width: 100%;
 background: white;
}

#logo{
      display: block;
    margin-right: auto;
    width: 22rem;
    height: auto;
}

.profileButton {
    color: rgb(228 43 4);
    text-decoration: none;
    border-radius: 12px;
    margin-top: 1rem;
    font-weight: bold;
    margin-right: 1rem;
    height: 48px;
}

.LogoutButton {
  color: rgb(228 43 4);
    text-decoration: none;
    border-radius: 12px;
    margin-top: 1rem;
    font-weight: bold;
    margin-right: 1rem;
    border: none;
    background: white;
    padding: 0;
    font-size: inherit;
    cursor: pointer;
}

.accueilButton {
  color: rgb(228 43 4);
    text-decoration: none;
    border-radius: 12px;
    margin-top: 1rem;
    font-weight: bold;
    margin-right: 1rem;
    border: none;
    background: white;
    padding: 0;
    font-size: inherit;
    cursor: pointer;
    height: 48px;
}

.divLogo {
  width: 50%;
}

.divNav {
  width: 50%;
  text-align: right;
}

@media screen and (max-width: 700px)
{
  header {
    flex-direction: column;
    height:10rem;
  }



}
</style>