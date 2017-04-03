<template>
  <Profil mode="new" v-bind:onConfirm="register" />
</template>

<script>
  import M2LButton from '@/components/M2LButton'
  import Profil from '@/components/Profil'

  export default {
    name: 'register',
    methods: {
      register: () => {
        console.log('registered')
      }
    },
    components: {
      M2LButton,
      Profil
    }
  }
</script>

<style scoped>
</style>
