<template>
  <div class="app-menu"><nav>
      <ul>
        <li v-for="item in items"><a v-on:click="onMenuClick(item)">{{ item | menuItem }}</a></li>

        <div v-if="showLogout || showCancelBooking">
          <Logout v-bind:showModal="showLogout" v-bind:onCancel="closeDialog" />
          <CancelBooking v-bind:showModal="showCancelBooking" v-bind:onCancel="closeDialog" />
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue';
import adminClientLib from '@/lib-adapters';

import bus from '@/bus';

import Logout from '@/components/Logout';
import CancelBooking from '@/components/CancelBooking';

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
    bus.$on('open-cancel-booking', () => {
      this.showCancelBooking = true;
    });

    bus.$on('close-cancel-booking', () => {
      this.showCancelBooking = false;
    });

    adminClientLib.router.openModal = state => {
      // TODO
      switch (state) {
        case 'logout':
          this.showLogout = true;
          break;
        case 'cancel-booking':
          bus.$emit('open-cancel-booking');
          break;
      }
    }

    adminClientLib.router.closeModal = () => {
      this.showLogout = false;
      bus.$emit('close-cancel-booking');      
    }
  },
  data () {
    return { 
      items: navService.menuItems
        .filter(item => ['logout', 'rooms', 'bookings'].indexOf(item) !== -1),
      showLogout: false,
      showCancelBooking: false,
    }
  },
  methods: {
    closeDialog: function() {
      this.showLogout = false;
      bus.$emit('close-cancel-booking');
    },
    onMenuClick: function (item) {
       navService.onItemMenuClick(item)
    }
  },
  components: {
    Logout,
    CancelBooking
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
