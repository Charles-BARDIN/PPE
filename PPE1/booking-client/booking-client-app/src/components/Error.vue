<template>
  <div id="errorsWrapper">
    <slot>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'error'
  }
</script>

<style scope>
  #errorsWrapper {
    color: red;
  }
</style>