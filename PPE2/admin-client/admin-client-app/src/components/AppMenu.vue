<template>
  <div class="app-menu"><nav>
      <ul>
        <li v-for="item in items"><a v-on:click="onMenuClick(item)">{{ item | menuItem }}</a></li>

        <Logout v-bind:showModal="showLogout" v-bind:onLogout="closeDialog" v-bind:onCancel="closeDialog" />
      </ul>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue';
import adminClientLib from '@/lib-adapters';

import Logout from '@/components/Logout';

const navService = adminClientLib.navigationService;

Vue.filter('menuItem', function (value) {
  const filter = {
    logout: 'Déconnexion',
    rooms: 'Liste des salles',
    bookings: 'Réservations'
  }
  return filter[value] || '';
})

export default {
  name: 'app-menu',
  created: function() {
    adminClientLib.router.openModal = state => {
      // TODO
      switch (state) {
        case 'logout':
          this.showLogout = true;
          break;
      }
    }

    adminClientLib.router.closeModal = () => {
      this.showLogout = false;
    }
  },
  data () {
    return { 
      items: navService.menuItems
        .filter(item => ['logout', 'rooms', 'bookings'].indexOf(item) !== -1),
      showLogout: false,
    }
  },
  methods: {
    closeDialog: function() {
      this.showLogout = false;
    },
    onMenuClick: function (item) {
       navService.onItemMenuClick(item)
    }
  },
  components: {
    Logout,
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
