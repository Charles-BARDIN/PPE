<template>
  <Profile mode="edit" v-bind:onConfirm="editUser" />
</template>

<script>
  import M2LButton from '@/components/M2LButton'
  import Profile from '@/components/Profile'

  export default {
    name: 'register',
    methods: {
      editUser: () => {
        console.log('registered')
      }
    },
    components: {
      M2LButton,
      Profile
    }
  }
</script>

<style scoped>
</style>