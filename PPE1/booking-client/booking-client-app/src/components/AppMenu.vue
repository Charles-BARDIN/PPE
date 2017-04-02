<template>
  <div class="app-menu">
    <span>
      <router-link to="/">
        <img src="../assets/ligue.png" alt="logo">
      </router-link>
    </span>

    <Login v-if="showLoginModal" @close-login="showLoginModal = false" />
    <Logout v-if="showLogoutModal" @close-logout="showLogoutModal = false" />

    <nav>
      <ul>
        <li v-for="item in items"><a v-on:click="onMenuClick(item)">{{ item | menuItem }}</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue';

import router from '@/router';

import Login from '@/components/Login';
import Logout from '@/components/Logout';

Vue.filter('menuItem', function (value) {
  const filter = {
    index: 'Accueil',
    room: 'Liste des salles',
    login: 'Connexion',
    register: 'Inscription',
    booking: 'Réservation',
    profile: 'Profile',
    logout: 'Déconnexion'
  }
  return filter[value] || '';
})

export default {
  name: 'app-menu',
  data () {
    return {
      items: navigationService.getMenuItems(),
      showLoginModal: false,
      showLogoutModal: false
    }
  },
  methods: {
    onMenuClick: (item) => {
      // navigationService.onItemMenuClick(item);
    }
  },
  components: {
      Login,
      Logout
  }
}
</script>

<style scoped>
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
