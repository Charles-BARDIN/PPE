<template>
  <div class="app-menu"><nav>
      <ul>
        <li v-for="item in items"><a v-on:click="onMenuClick(item)">{{ item | menuItem }}</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue';
import adminClientLib from '@/lib-adapters';

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
    }

    adminClientLib.router.closeModal = () => {
      // TODO
    }
  },
  data () {
    return { 
      items: navService.menuItems
        .filter(item => ['logout', 'rooms', 'bookings'].indexOf(item) !== -1)
    }
  },
  methods: {
    onMenuClick: function (item) {
       navService.onItemMenuClick(item)
    }
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
