 <template>
 
 <header>
      <img src="../assets/icon-left-font.png"  alt="le logo de gropomania" title="logo groupomania" id="logo" />
      <router-link to="/profile" role='button' class='profileButton'>MON PROFILE</router-link>
      <button @click="Logout" type='button' class='LogoutButton'>DECONNEXION</button>
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
}

.profileButton {
    color: rgb(253, 45, 1);
    text-decoration: none;
    border-radius: 12px;
    margin-top: 1rem;
    font-weight: bold;
    margin-right: 1rem;
}

.LogoutButton {
  color: rgb(253, 45, 1);
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
</style>