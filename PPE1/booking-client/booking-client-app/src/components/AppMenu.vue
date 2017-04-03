<template>
  <div class="app-menu">
    <span>
      <router-link to="/">
        <img src="../assets/ligue.png" alt="logo">
      </router-link>
    </span>

    <nav>
      <ul>
        <li v-for="item in items"><a v-on:click="onMenuClick(item)">{{ item | menuItem }}</a></li>

        <Login v-bind:showModal="showLogin" v-bind:onLogin="closeDialog" />
        <Logout v-bind:showModal="showLogout" v-bind:onLogout="closeDialog" />
      </ul>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue';
import bookingClientLib from '@/lib-adapter';

import Login from '@/components/Login';
import Logout from '@/components/Logout';

const navService = bookingClientLib.getNavigationService();

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
  components: {
      Login
  },
  created: function() {
    bookingClientLib.getRouter().openModal = state => {
      if(state === 'login') {
        this.showLogin = true;
      } else {
        this.showLogout = true;
      }
    }
  },
  data () {
    return { 
      showLogin: false,
      showLogout: false,
      items: navService.getMenuItems()
    }
  },
  methods: {
    closeDialog: function() {
      this.showLogin = false;
      this.showLogout = false;
    },
    onMenuClick: function (item) {
       navService.onItemMenuClick(item)
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
