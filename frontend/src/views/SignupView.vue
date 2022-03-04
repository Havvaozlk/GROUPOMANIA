<template>
<div class='home'>
<img alt='Groupomania logo' src="../assets/icon-above-font.png" />
<p> Avec Groupomania, partagez et rester en contact avec vos collègues. </p>
<form id="form">

</form>
</div>
</template>

<script>
export default {
  name: "SignupView",
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

#form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 2rem 0 2rem 0;
    border: solid 0.5px;
    box-shadow: 1px 1px 1px grey;
    }
</style>