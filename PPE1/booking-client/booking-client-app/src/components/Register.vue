<template>
  <div>
    <Profil mode="new" v-bind:onConfirm="register" />

    <Error>
      <div v-for="err in errors">{{ err | error }}</div>
    </Error>
  </div>
</template>

<script>
  import M2LButton from '@/components/M2LButton'
  import Profil from '@/components/Profil'
  import Error from '@/components/Error'

  import bookingClientLib from '@/lib-adapter'
  import { errorFilter } from '@/common';
  import Vue from 'vue';


  Vue.filter('error', errorFilter);

  const registerService = bookingClientLib.registerService;

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
      Profil,
      Error,
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
