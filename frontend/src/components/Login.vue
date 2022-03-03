<template>
<form id="form">
<input type='email' id='email' placeholder='Adresse email'>
<input type='password' id='password' placeholder='Mot de passe'>
<input type='submit' value='SE CONNECTER'>
<a href='#'>Mot de passe oublié ? </a>
<div class='signup'>
<button type='button'>CREER UN COMPTE</button>
</div>
</form>
</template>
<script>
export default {
  name: 'LoginUser',
  props: {
    msg: String
  }
}
</script>
<style>
#form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 2rem 0 2rem 0;
    border: solid 0.5px;
    box-shadow: 1px 1px 1px grey;
    }

input#email  {
    width: 40%;
    margin-bottom: 1rem;
    padding-left: 1rem;
    height: 2rem;
    border-radius: 6px;
    border: 0.5px solid 
}

input#password  {
    width: 40%;
    margin-bottom: 1rem;
    padding-left: 1rem;
    height: 2rem;
    border-radius: 6px;
    border: 0.5px solid;
}

input[type="submit"] {
width: 40%;
    margin-bottom: 1rem;
        background: rgb(253, 45, 1);
    color: white;
    border: 0;
    border-radius: 6px;
    height: 2rem;
    cursor: pointer
}

a {
    color: dodgerblue;
    font-size: small;
    margin-bottom: 1rem;
}

.signup {
    width: 100%;
    border-top: solid 0.5px;
    padding-top: 2rem;
    }

button {
padding: 0.7rem 2rem;
    border-radius: 6px;
    color: white;
    background-color: forestgreen;
    border: 0px;
    }

</style>