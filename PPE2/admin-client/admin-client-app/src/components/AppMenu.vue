<template>
  <div class="app-menu"><nav>
      <ul>
        <li v-for="item in items"><a v-on:click="onMenuClick(item)">{{ item | menuItem }}</a></li>

        <div v-if="showLogout || showCancelBooking || showDeleteRoom">
          <Logout v-bind:showModal="showLogout" v-bind:onCancel="closeDialog" />
          <CancelBooking v-bind:showModal="showCancelBooking" v-bind:onCancel="closeDialog" />
          <DeleteRoom v-bind:showModal="showDeleteRoom" v-bind:onCancel="closeDialog" />
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
import DeleteRoom from '@/components/DeleteRoom';

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

    bus.$on('open-delete-room', () => {
      this.showDeleteRoom = true;
    });

    bus.$on('close-delete-room', () => {
      this.showDeleteRoom = false;
    });

    adminClientLib.router.openModal = state => {
      switch (state) {
        case 'logout':
          this.showLogout = true;
          break;
        case 'cancel-booking':
          bus.$emit('open-cancel-booking');
          break;
        case 'delete-room':
          bus.$emit('open-delete-room');
          break;
      }
    }

    adminClientLib.router.closeModal = () => {
      this.showLogout = false;
      bus.$emit('close-cancel-booking');      
      bus.$emit('close-delete-room');      
    }
  },
  data () {
    return { 
      items: navService.menuItems
        .filter(item => ['logout', 'rooms', 'bookings'].indexOf(item) !== -1),
      showLogout: false,
      showCancelBooking: false,
      showDeleteRoom: false
    }
  },
  methods: {
    closeDialog: function() {
      this.showLogout = false;
      bus.$emit('close-cancel-booking');
      bus.$emit('close-delete-room');
    },
    onMenuClick: function (item) {
       navService.onItemMenuClick(item)
    }
  },
  components: {
    Logout,
    CancelBooking,
    DeleteRoom
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
