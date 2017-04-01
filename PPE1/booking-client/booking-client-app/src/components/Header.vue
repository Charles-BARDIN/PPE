<template>
  <div class="header">
  <div class="masthead borderbottom">
      <span class="logo">
          <a href="#"><img src="../assets/ligue.png" alt="logo"></a>
        </span>
      <nav class="menu">
        <ul class="nav nav-justified">
          <li class="biggermenu"><a href="index.html">Acceuil</a></li>
          <li class="biggermenu"><a href="salle.html">Salles</a></li>
          <li class="biggermenu"><a href="reservation.html">Réservation</a></li>
          <li class="biggermenu"><a href="inscription.html">Inscriptions</a></li>
          <li class="biggermenu"><a href="profil.html">Connexion</a></li>
        </ul>
      </nav>
    </div>
    </div>
    
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      msg: 'Connard'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
