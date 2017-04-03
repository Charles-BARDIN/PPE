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

        <Login v-bind:showModal="showLogin" v-bind:onLogin="closeDialog" v-bind:onCancel="closeDialog" />
        <Logout v-bind:showModal="showLogout" v-bind:onLogout="closeDialog" v-bind:onCancel="closeDialog" />
      </ul>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue';
import bookingClientLib from '@/lib-adapter';

import Login from '@/components/Login';
import Logout from '@/components/Logout';

const navService = bookingClientLib.navigationService;

Vue.filter('menuItem', function (value) {
  const filter = {
    index: 'Accueil',
    room: 'Liste des salles',
    login: 'Connexion',
    register: 'Inscription',
    booking: 'Réservation',
    profil: 'Profil',
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
    bookingClientLib.router.openModal = state => {
      if(state === 'login') {
        this.showLogin = true;
      } else {
        this.showLogout = true;
      }
    }

    bookingClientLib.router.closeModal = () => {
      this.showLogin = false;
      this.showLogout = false;
    }
  },
  data () {
    return { 
      showLogin: false,
      showLogout: false,
      items: navService.menuItems
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
  cursor: pointer;
  user-select: none;
}

a {
  color: #42b983;
}
</style>
