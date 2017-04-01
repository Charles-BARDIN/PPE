<template>
  <div class="app-menu">
    <span>
      <router-link to="/">
        <img src="../assets/ligue.png" alt="logo">
      </router-link>
    </span>

    <nav>
      <ul>
        <li v-for="item in items"><a v-on:click="item.action">{{ item.label }}</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'app-menu',
  data () {
    return {
      items: [
        {
          label: 'Acceuil',
          action: () => {
            router.push('/')
          }
        },
        {
          label: 'Salles',
          action: () => {
            router.push('salle')
          }
        },
        {
          label: 'Réservation',
          action: () => {
            router.push('reservation')
          }
        },
        {
          label: 'Inscriptions',
          action: () => {
            router.push('inscription')
          }
        },
        {
          label: 'Profile',
          action: () => {
            router.push('profile')
          }
        },
      ]
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
