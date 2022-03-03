<!-- <template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="WELCOME" />
  </div>
</template> -->


<template>
<div class='home'>
<img alt='Groupomania logo' src="../assets/icon-above-font.png" />
<p> Avec Groupomania, partagez et rester en contact avec vos collègues. </p>
 <LoginUser msg="WELCOME" />
</div>
</template>

<script>
// @ is an alias to /src
import LoginUser from "@/components/Login.vue";

export default {
  name: "HomeView",
  components: {
    LoginUser,
  },
};
</script>
<style>
.home {
align-items: center
}

.home img {
width: 40%
}
.home p {
margin-top: 0;
    font-size: 1.5rem;
    font-family: inherit;
}
</style>
