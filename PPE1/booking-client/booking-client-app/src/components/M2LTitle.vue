<template>
  <div id="titleWrapper">
    <slot>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'title'
  }
</script>

<style scope>
#titleWrapper {
  font-weight: normal;
  font-size: 2.5em;
}
</style>