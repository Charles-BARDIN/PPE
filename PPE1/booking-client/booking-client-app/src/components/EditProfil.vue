<template>
  <div>
    <Profil mode="edit" v-bind:onConfirm="editUser" v-bind:user="user" />

    <div v-if="showConfirm">
      Profil modifié avec succès !
    </div>
    <div v-for="err in errors">
      {{ err | error }}
    </div>
  </div>
</template>

<script>
  import M2LButton from '@/components/M2LButton'
  import Profil from '@/components/Profil'
  
  import bookingClientLib from '@/lib-adapter'
  import { errorFilter } from '@/common';
  import Vue from 'vue';


  Vue.filter('error', errorFilter);

  const profilService = bookingClientLib.getProfilService();

  export default {
    name: 'register',
    created: function() {
      const isMail = this.isMail;
      const hideTexts = this.hideTexts;
      const showValidationErrors = this.showValidationErrors;
      const showBackendError = this.showBackendError;
      const setUserProfil = this.setUserProfil;
      const showModifyConfirmation = this.showModifyConfirmation;

      const validator = {
        isMail
      };
      const controller = {
        hideTexts,
        showValidationErrors,
        showBackendError,
        setUserProfil,
        showModifyConfirmation,
      };

      profilService.validator = validator;
      profilService.controller = controller;

      profilService.onPageLoad();
    },
    methods: {
      editUser: user => {
        profilService.modifyUser(user);
      },
      isMail: function(mail) {
        return mail.match(/^(.)+@.+\.(.)+$/);
      },
      hideTexts: function() {
        this.errors = [];
        this.showConfirm = false;
      },
      showValidationErrors: function(errors) {
        this.errors = errors;
      },
      showBackendError: function(err) {
        this.errors = [err];
      },
      setUserProfil: function(user) {
        this.user = user
      },
      showModifyConfirmation: function() {
        this.showConfirm = true;
      }
    },
    components: {
      M2LButton,
      Profil
    },
    data () {
      return {
        errors: [],
        user: {},
        showConfirm: false
      };
    }
  }
</script>

<style scoped>
</style>