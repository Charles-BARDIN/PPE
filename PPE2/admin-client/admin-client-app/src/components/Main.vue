<template>
  <div>
    <AppMenu />
    <router-view></router-view>
  </div>
</template>

<script>
import AppMenu from '@/components/AppMenu'

export default {
  name: 'main',
  components: {
    AppMenu
  }
}
</script>

<style scoped>
</style>
