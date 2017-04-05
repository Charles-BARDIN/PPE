<template>
  <div id="confirmWrapper">
    <slot>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'confirm'
  }
</script>

<style scope>
  #confirmWrapper {
    color: green;
  }
</style>