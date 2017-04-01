<template>
  <div class="app-menu">
  <div class="masthead borderbottom">
      <span class="logo">
          <router-link to="/"><img src="../assets/ligue.png" alt="logo"></router-link>
        </span>
      <nav class="menu">
        <ul class="nav nav-justified">
          <li class="biggermenu" v-for="item in items"><a v-on:click="item.action">{{ item.label }}</a></li>
        </ul>
      </nav>
    </div>
    </div>
    
</template>

<script>
export default {
  name: 'app-menu',
  props: ['items']
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
