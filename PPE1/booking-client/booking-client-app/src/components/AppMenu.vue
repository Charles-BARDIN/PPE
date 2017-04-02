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

import { navigationService } from '@/lib-adapters';

export default {
  name: 'app-menu',
  data () {
    return {
      items: navigationService.getMenuItems()
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
}

a {
  color: #42b983;
}
</style>
