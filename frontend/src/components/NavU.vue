 <template>
 
 <header>
      <img src="../assets/icon-left-font.png"  alt="le logo de gropomania" title="logo groupomania" id="logo" />
      <router-link to="/profile" role='button' class='profileButton'>MON PROFILE</router-link>
 </header>
</template>


<script>
export default {
  name: 'NavU',
  }
</script>

<style>
header{
  display: flex;
  align-items: center;
  height: 5rem;
 width: 100%;
}

#logo{
      display: block;
    margin-left: auto;
    margin-right: auto;
    width: 22rem;
}

.profileButton {
      background: rgb(253, 45, 1);
    color: white;
    padding: 1rem;
    text-decoration: none;
    border-radius: 12px;
    margin-top: 1rem;
}
</style>