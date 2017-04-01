<template>
  <div id="app">
    <AppMenu v-bind:items="menuItems" />
    <router-view></router-view>
  </div>
</template>

<script>
import router from '@/router';

import AppMenu from '@/components/AppMenu';

export default {
  name: 'app',
  components: {
      AppMenu
  },
  data () {
    return {
      menuItems: [
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
            router.push('profil')
          }
        },
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
