<template>
  <div>
    <Profil mode="new" v-bind:onConfirm="register" />

    <div v-for="error in errors">
      {{ error }}
    </div>
  </div>
</template>

<script>
  import M2LButton from '@/components/M2LButton'
  import Profil from '@/components/Profil'

  import bookingClientLib from '@/lib-adapter'

  const registerService = bookingClientLib.getRegisterService();

  export default {
    name: 'register',
    created: function() {
      const validator = {
        isMail: this.isMail
      }

      const controller = {
        showBackendError : this.showBackendError, 
        showValidationErrors : this.showValidationErrors,
        hideErrors: this.hideErrors,
      }

      registerService.validator = validator;
      registerService.controller = controller;
    },
    methods: {
      register: (user) => {
        registerService.register(user)
      },
      showValidationErrors: function(errors) {
          this.errors = errors; 
      },
      hideErrors: function() {
        this.errors = [];
      },
      showBackendError: function(errors) {
        this.errors = errors; 
      },
      isMail: mail => {
        return mail.match(/^(.)+@(.)+\.(.)+$/);
      }
    },
    components: {
      M2LButton,
      Profil
    },
    data () {
      return {
        errors: []
      }
    }
  }
</script>

<style scoped>
</style>
