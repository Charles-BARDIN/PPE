<template>
  <p class="m2l-button">
    <a role="button" v-on:click="action">{{ label }}</a>
  </p>
</template>

<script>
  export default {
    name: 'm2l-button',
    props: ['label', 'action']
  }
</script>

<style scoped>
  a {
    color: #42b983;
  }

  p {
    display: inline-block;
    padding: 6px 16px;
    background-color: rgba(0, 0, 125, 0.5);
    box-shadow: 5px 5px rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    cursor: pointer;
  }
</style>